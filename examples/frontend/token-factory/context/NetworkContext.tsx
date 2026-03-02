"use client";

import { ENV_VARS, NETWORKS, NetworkType, switchNetwork } from "@/lib/env";
import { createContext, useContext, useEffect, useState } from "react";

interface NetworkContextValue {
  currentNetwork: NetworkType;
  setNetwork: (network: NetworkType) => void;
  networks: typeof NETWORKS;
}

export const NetworkContext = createContext<NetworkContextValue | null>(null);

export const NetworkContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>(
    ENV_VARS.DEFAULT_NETWORK
  );

  useEffect(() => {
    // Get network from localStorage on client side
    const storedNetwork = localStorage.getItem(
      "zigchain-network"
    ) as NetworkType;
    if (storedNetwork && NETWORKS[storedNetwork]) {
      setCurrentNetwork(storedNetwork);
    } else {
      // Use default from .env file
      setCurrentNetwork(ENV_VARS.DEFAULT_NETWORK);
    }
  }, []);

  const setNetwork = (network: NetworkType) => {
    setCurrentNetwork(network);
    switchNetwork(network);
  };

  const value: NetworkContextValue = {
    currentNetwork,
    setNetwork,
    networks: NETWORKS,
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export function useNetworkContext() {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error(
      "useNetworkContext must be used within a NetworkContextProvider"
    );
  }

  return context;
}
