import { AssetList, Chain } from "@chain-registry/types";
import { currentNetwork, currentNetworkConfig } from "./env";

export const zigchain: Chain = {
  chain_id: currentNetworkConfig.chainId,
  chain_name: "zigchain",
  status: currentNetwork === "mainnet" ? "live" : "development",
  network_type: currentNetwork === "mainnet" ? "mainnet" : "testnet",
  pretty_name: "Zignaly",
  bech32_prefix: "zig",
  slip44: 118,
  logo_URIs: {
    png: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
    svg: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
    jpeg: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
  },
};

export const localzigchainAssetlist: AssetList = {
  chain_name: "ZIGCHAIN Network",
  assets: [
    {
      denom_units: [],
      base: "",
      name: "Zig",
      display: "Zig",
      symbol: "uzig",
    },
    {
      denom_units: [],
      base: "",
      name: "StZig",
      display: "StZig",
      symbol: "stzig",
    },
  ],
};
