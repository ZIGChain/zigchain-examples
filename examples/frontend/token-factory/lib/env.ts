// Environment variables directly from .env file
export const ENV_VARS = {
  // Network configurations
  MAINNET_API_URL:
    process.env.NEXT_PUBLIC_MAINNET_API_URL ??
    "https://public-zigchain-lcd.numia.xyz",
  MAINNET_RPC_URL:
    process.env.NEXT_PUBLIC_MAINNET_RPC_URL ??
    "https://public-zigchain-rpc.numia.xyz",
  MAINNET_CHAIN_ID: process.env.NEXT_PUBLIC_MAINNET_CHAIN_ID ?? "zigchain-1",

  TESTNET_API_URL:
    process.env.NEXT_PUBLIC_TESTNET_API_URL ??
    "https://public-zigchain-testnet-lcd.numia.xyz",
  TESTNET_RPC_URL:
    process.env.NEXT_PUBLIC_TESTNET_RPC_URL ??
    "https://public-zigchain-testnet-rpc.numia.xyz",
  TESTNET_CHAIN_ID: process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID ?? "zig-test-2",

  // Default network
  DEFAULT_NETWORK:
    (process.env.NEXT_PUBLIC_DEFAULT_NETWORK as "mainnet" | "testnet") ??
    "mainnet",

  // Other variables
  GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL ?? "",
  ENABLE_LOGGING: process.env.ENABLE_LOGGING === "true",

  // Site branding
  SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE ?? "Token Factory",
  SITE_DESCRIPTION:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Token Factory on Zigchain",
};

// Network configurations using environment variables
export const NETWORKS = {
  mainnet: {
    apiURL: ENV_VARS.MAINNET_API_URL,
    rpcURL: ENV_VARS.MAINNET_RPC_URL,
    chainId: ENV_VARS.MAINNET_CHAIN_ID,
    name: "Mainnet",
  },
  testnet: {
    apiURL: ENV_VARS.TESTNET_API_URL,
    rpcURL: ENV_VARS.TESTNET_RPC_URL,
    chainId: ENV_VARS.TESTNET_CHAIN_ID,
    name: "Testnet",
  },
} as const;

export type NetworkType = keyof typeof NETWORKS;

// Helper function to get network config
export const getNetworkConfig = (network: NetworkType) => NETWORKS[network];

// Helper function to switch network
export const switchNetwork = (network: NetworkType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("zigchain-network", network);
    // Reload the page to apply new network configuration
    window.location.reload();
  }
};

// Get current network from localStorage or default
export const getCurrentNetwork = (): NetworkType => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("zigchain-network") as NetworkType;
    return stored && NETWORKS[stored] ? stored : ENV_VARS.DEFAULT_NETWORK;
  }
  return ENV_VARS.DEFAULT_NETWORK;
};

// Current network configuration
export const currentNetwork = getCurrentNetwork();
export const currentNetworkConfig = NETWORKS[currentNetwork];

// Legacy env export for backward compatibility
export const env = {
  apiURL: currentNetworkConfig.apiURL,
  rpcURL: currentNetworkConfig.rpcURL,
  chainId: currentNetworkConfig.chainId,
  network: currentNetwork,
  pinataPublicGateway: ENV_VARS.GATEWAY_URL,
  enableLogging: ENV_VARS.ENABLE_LOGGING,
  prefix: "zig",
};
