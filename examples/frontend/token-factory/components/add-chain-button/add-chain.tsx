import { chainClient } from "@/context/ChainContext";
import { env } from "@/lib/env";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { toast } from "sonner";

const wallets = [
  {
    key: "keplr",
    name: "Keplr Wallet",
    installUrl:
      "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
  },
];

const AddChainButton = () => {
  const addChain = async (wallet: "keplr") => {
    if (!(window as any)[wallet]) {
      const installUrl = wallets.find((x) => x.key === wallet)?.installUrl;

      toast(`Wallet '${wallet}' not found, you first need to install it.`, {
        action: {
          label: "Install",
          onClick: () => {
            if (installUrl) {
              window.location.replace(installUrl);
            }
          },
        },
      });
      return;
    }

    try {
      const staking = (
        await chainClient.CosmosStakingV1Beta1.query.queryParams()
      ).data;

      const node_info = (
        await chainClient.CosmosBaseTendermintV1Beta1.query.serviceGetNodeInfo()
      ).data;

      const chainId = node_info.default_node_info?.network ?? "";
      const chainName = chainId?.toUpperCase() + " Network";
      const tokens = (
        await chainClient.CosmosBankV1Beta1.query.queryTotalSupply()
      ).data;
      const addrPrefix = env.prefix ?? "cosmos";
      const rpc = env.rpcURL;
      const rest = env.apiURL;

      let bip44 = {
        coinType: 118,
      };

      let bech32Config = {
        bech32PrefixAccAddr: addrPrefix,
        bech32PrefixAccPub: addrPrefix + "pub",
        bech32PrefixValAddr: addrPrefix + "valoper",
        bech32PrefixValPub: addrPrefix + "valoperpub",
        bech32PrefixConsAddr: addrPrefix + "valcons",
        bech32PrefixConsPub: addrPrefix + "valconspub",
      };

      let currencies =
        tokens.supply?.map((x: any) => {
          const y = {
            coinDenom: x.denom?.toUpperCase() ?? "",
            coinMinimalDenom: x.denom ?? "",
            coinDecimals: 0,
          };
          return y;
        }) ?? [];

      let stakeCurrency = {
        coinDenom: staking.params?.bond_denom?.toUpperCase() ?? "",
        coinMinimalDenom: staking.params?.bond_denom ?? "",
        coinDecimals: 0,
      };

      let feeCurrencies =
        tokens.supply?.map((x: any) => {
          const y = {
            coinDenom: x.denom?.toUpperCase() ?? "",
            coinMinimalDenom: x.denom ?? "",
            coinDecimals: 0,
          };
          return y;
        }) ?? [];

      if (chainId) {
        const suggestOptions = {
          chainId,
          chainName,
          rpc,
          rest,
          stakeCurrency,
          bip44,
          bech32Config,
          currencies,
          feeCurrencies,
          image: `https://pbs.twimg.com/profile_images/1793945589165506560/54PyQaWN_400x400.jpg`,
        };

        await (window as any)[wallet].experimentalSuggestChain(suggestOptions);

        (window as any)[wallet].defaultOptions = {
          sign: {
            preferNoSetFee: true,
            preferNoSetMemo: true,
          },
        };
      }
      await (window as any)[wallet].enable(chainId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Add Chain</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Wallets"
        onAction={(key) => addChain(key as any)}
      >
        {wallets.map((wallet) => (
          <DropdownItem
            key={wallet.key}
            startContent={
              <Image
                height={28}
                width={28}
                src={`./${wallet.key}-logo.svg`}
                alt={wallet.name}
              />
            }
            description={`Add ZIGChain to ${wallet.name}`}
          >
            {wallet.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddChainButton;
