import { msgTypes as dexMsgTypes } from "@/ts-client/zigchain.dex";
import { msgTypes as factoryMsgTypes } from "@/ts-client/zigchain.factory";
import { isDeliverTxSuccess, StdFee } from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "osmo-query";
import { TxRaw } from "osmo-query/dist/codegen/cosmos/tx/v1beta1/tx";
import { toast } from "sonner";

const txRaw = cosmos.tx.v1beta1.TxRaw;

interface Msg {
  typeUrl: string;
  value: any;
}

interface TxOptions {
  fee?: StdFee | null;
  toast?: {
    title?: string;
    description?: string;
  };
  onSuccess?: () => void;
}

export enum TxStatus {
  Failed = "Transaction Failed",
  Successful = "Transaction Successful",
  Broadcasting = "Transaction Broadcasting",
}

export const useTx = () => {
  const { address, getSigningStargateClient, estimateFee } =
    useChain("zigchain");

  const tx = async (msgs: Msg[], options: TxOptions) => {
    if (!address) {
      toast.error("Wallet not connected", {
        description: "Please connect the wallet",
      });

      return;
    }

    let signed: TxRaw;
    let client: Awaited<ReturnType<typeof getSigningStargateClient>>;

    try {
      let fee: StdFee;
      if (options?.fee) {
        fee = options.fee;
        client = await getSigningStargateClient();
      } else {
        const [_fee, _client] = await Promise.all([
          estimateFee(msgs),
          getSigningStargateClient(),
        ]);
        fee = _fee;
        client = _client;
      }

      for (const type of [...factoryMsgTypes, ...dexMsgTypes]) {
        client.registry.register(type[0], type[1]);
      }

      signed = await client.sign(address, msgs, fee, "");
    } catch (e: any) {
      console.error(e);

      toast.error(TxStatus.Failed, {
        description: e?.message || "An unexpected error has occured",
      });

      return;
    }

    if (client && signed) {
      const promise = client.broadcastTx(
        Uint8Array.from(txRaw.encode(signed).finish())
      );

      toast.promise(promise, {
        loading: "Waiting for transaction to be included in the block",
        success: (data) => {
          if (isDeliverTxSuccess(data)) {
            if (options.onSuccess) options.onSuccess();
            return options.toast?.title || TxStatus.Successful;
          } else {
            console.error(data?.rawLog);
            return TxStatus.Failed;
          }
        },
        error: (error: any) => {
          if (error?.message) {
            console.error(error?.message);
          }
          return TxStatus.Failed;
        },
      });
    }
  };

  return { tx };
};
