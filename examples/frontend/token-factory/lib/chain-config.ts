import { AssetList, Chain } from "@chain-registry/types";
import { NATIVE_DENOM } from "./constants";
import { currentNetwork, currentNetworkConfig } from "./env";

export const zigchain: Chain = {
  chain_id: currentNetworkConfig.chainId,
  chain_name: "zigchain",
  chain_type: "cosmos",
  status: "live",
  network_type: currentNetwork === "mainnet" ? "mainnet" : "testnet",
  pretty_name: "Zignaly",
  bech32_prefix: "zig",
  slip44: 118,
  logo_URIs: {
    png: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
    svg: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
  },
};

export const localzigchainAssetlist: AssetList = {
  chain_name: "ZIGCHAIN Network",
  assets: [
    {
      denom_units: [
        { denom: NATIVE_DENOM, exponent: 0 },
        { denom: "ZIG", exponent: 18 },
      ],
      base: NATIVE_DENOM,
      name: "ZIG",
      display: "ZIG",
      symbol: "ZIG",
      type_asset: "sdk.coin",
    },
    {
      denom_units: [],
      base: "",
      name: "StZig",
      display: "StZig",
      symbol: "stzig",
      type_asset: "sdk.coin",
    },
  ],
};
