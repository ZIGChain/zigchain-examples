import { localzigchainAssetlist, zigchain } from "@/lib/chain-config";
import { currentNetworkConfig, ENV_VARS } from "@/lib/env";
import { Client } from "@/ts-client";
import { Chain } from "@chain-registry/types";
import { ChainProvider } from "@cosmos-kit/react";
import { SignerOptions, wallets } from "cosmos-kit";
import { createContext, useContext } from "react";

// Keplr Mobile connects through WalletConnect, which needs a project ID.
// Without one, offer only the Keplr browser extension.
const walletConnectProjectId = ENV_VARS.WALLETCONNECT_PROJECT_ID;
const keplr = wallets.for("keplr");
const keplrWallets =
  walletConnectProjectId ? keplr : keplr.extension;

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
        wallets={keplrWallets}
        throwErrors={false}
        walletConnectOptions={
          walletConnectProjectId
            ? {
                signClient: {
                  projectId: walletConnectProjectId,
                  relayUrl: "wss://relay.walletconnect.org",
                  metadata: {
                    name: "ZIGChain",
                    description: "ZIGChain Examples",
                    url: "",
                    icons: [],
                  },
                },
              }
            : undefined
        }
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
