"use client";

import { useNetworkContext } from "@/context/NetworkContext";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export function NetworkSwitch() {
  const { currentNetwork, setNetwork, networks } = useNetworkContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleNetworkSwitch = async (network: typeof currentNetwork) => {
    if (network === currentNetwork) return;

    setIsLoading(true);
    try {
      setNetwork(network);
    } catch (error) {
      console.error("Failed to switch network:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground-600">Network:</span>
      <div className="flex rounded-lg border border-divider bg-content1 p-1">
        {Object.entries(networks).map(([key, config]) => (
          <Button
            key={key}
            size="sm"
            variant={currentNetwork === key ? "solid" : "light"}
            color={currentNetwork === key ? "primary" : "default"}
            className="min-w-0 px-3 py-1 text-xs"
            onClick={() => handleNetworkSwitch(key as typeof currentNetwork)}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {config.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
