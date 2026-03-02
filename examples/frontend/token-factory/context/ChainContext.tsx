import { localzigchainAssetlist, zigchain } from "@/lib/chain-config";
import { currentNetworkConfig } from "@/lib/env";
import { Client } from "@/ts-client";
import { Chain } from "@chain-registry/types";
import { ChainProvider } from "@cosmos-kit/react";
import { SignerOptions, wallets } from "cosmos-kit";
import { createContext, useContext } from "react";

export const chainClient = new Client({
  apiURL: currentNetworkConfig.apiURL,
  rpcURL: currentNetworkConfig.rpcURL,
  prefix: "zig",
});

interface WalletContextValue {}

export const WalletContext = createContext<WalletContextValue | null>(null);

export const WalletContextProvider = ({ children }: any) => {
  const signerOptions: SignerOptions = {
    preferredSignType: (chain: string | Chain) => {
      return "direct";
    },
  };

  return (
    <WalletContext.Provider value={{}}>
      <ChainProvider
        chains={[zigchain]}
        assetLists={[localzigchainAssetlist]}
        wallets={wallets}
        walletConnectOptions={{
          signClient: {
            projectId: "",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "ZIGChain",
              description: "ZIGChain Examples",
              url: "",
              icons: [],
            },
          },
        }}
        endpointOptions={{
          endpoints: {
            zigchain: {
              rpc: [currentNetworkConfig.rpcURL],
              rest: [currentNetworkConfig.apiURL],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        {children}
      </ChainProvider>
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWalletContext must be used within a WalletContextProvider"
    );
  }

  return context;
}
