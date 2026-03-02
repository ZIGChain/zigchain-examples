/**
 * Token display metadata for wallet and lists.
 * - Known native/fallback tokens (e.g. ZIG) get name, symbol, icon like factory tokens (cbus, bsheep).
 * - IBC tokens show short names (USDC, ATOM) and optional icons.
 */

/** Native ZIG and other known base denoms: same shape as IPFS metadata so wallet treats them like cbus/bsheep */
export const KNOWN_TOKEN_METADATA: Record<
  string,
  { name: string; symbol: string; ticker: string; icon: string; image?: string }
> = {
  uzig: {
    name: "ZIG",
    symbol: "ZIG",
    ticker: "ZIG",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
  },
};

/** IBC / common tickers -> short display name (primary label in wallet) */
const IBC_DISPLAY_NAME: Record<string, string> = {
  UUSDC: "USDC",
  USDC: "USDC",
  UATOM: "ATOM",
  ATOM: "ATOM",
  USDT: "USDT",
  UOSMO: "OSMO",
  OSMO: "OSMO",
};

/** Optional icons for IBC/known symbols (so USDC/ATOM show proper image) */
export const KNOWN_SYMBOL_ICONS: Record<string, string> = {
  USDC: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  UUSDC:
    "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  ATOM: "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png",
  UATOM: "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png",
  ZIG: "https://s2.coinmarketcap.com/static/img/coins/64x64/9260.png",
};

/**
 * Normalize IBC/long denom to short display name (e.g. "transfer/channel-3/uusdc" -> "USDC").
 * Returns "" when not an IBC token we map, so caller can use original name.
 */
export function getTokenDisplayName(
  denom: string | undefined,
  ticker: string | undefined,
): string {
  const t = (ticker ?? denom ?? "").toUpperCase().trim();
  if (t && IBC_DISPLAY_NAME[t]) return IBC_DISPLAY_NAME[t];
  const lower = (denom ?? "").toLowerCase();
  if (lower.includes("uatom")) return "ATOM";
  if (lower.includes("uusdc")) return "USDC";
  if (lower.includes("uusdt")) return "USDT";
  if (lower.includes("uosmo")) return "OSMO";
  return "";
}

/**
 * Display symbol (secondary line). Returns short name for IBC, else "" so caller uses original.
 */
export function getTokenDisplaySymbol(
  denom: string | undefined,
  ticker: string | undefined,
): string {
  return getTokenDisplayName(denom, ticker);
}

/**
 * Icon URL for a token: from denom metadata (icon) or known symbol map.
 */
export function getTokenIconUrl(
  iconFromMetadata: string | undefined,
  symbolOrTicker: string | undefined,
): string {
  if (iconFromMetadata?.trim()) return iconFromMetadata.trim();
  const key = (symbolOrTicker ?? "").toUpperCase();
  return KNOWN_SYMBOL_ICONS[key] ?? "";
}
