/**
 * Token USD price utilities.
 * Stablecoins are treated as $1; other tokens use CoinGecko when available.
 */

const STABLECOIN_SYMBOLS = new Set(
  ["USDC", "USDT", "UUSDC", "DAI", "BUSD", "TUSD", "USDP", "FRAX", "USDD"].map(
    (s) => s.toUpperCase(),
  ),
);

/** CoinGecko id by symbol (uppercase). Add more as needed. */
const COINGECKO_IDS: Record<string, string> = {
  ATOM: "cosmos",
  UATOM: "cosmos",
  OSMO: "osmosis",
  EVMOS: "evmos",
  JUNO: "juno-network",
  STARS: "stargaze",
  INJ: "injective-protocol",
  TIA: "celestia",
  ZIG: "zignaly", // Zigchain / ZIG on CoinGecko
};

const priceCache: Record<string, { price: number; ts: number }> = {};
const CACHE_MS = 60_000; // 1 minute

function getCachedPrice(symbol: string): number | null {
  const key = symbol.toUpperCase();
  const cached = priceCache[key];
  if (cached && Date.now() - cached.ts < CACHE_MS) return cached.price;
  return null;
}

function setCachedPrice(symbol: string, price: number) {
  priceCache[symbol.toUpperCase()] = { price, ts: Date.now() };
}

/**
 * Returns USD price for known stablecoins (1) or from cache.
 */
export function getStablecoinOrCachedPrice(symbol: string): number | null {
  const key = (symbol || "").toUpperCase();
  if (STABLECOIN_SYMBOLS.has(key)) return 1;
  return getCachedPrice(key);
}

/**
 * Fetch USD prices from CoinGecko for given symbols (non-stablecoins).
 * Symbols not on CoinGecko are not included in the result.
 */
export async function fetchTokenPrices(
  symbols: string[],
): Promise<Record<string, number>> {
  const result: Record<string, number> = {};
  const toFetch: string[] = [];
  const symbolById: Record<string, string> = {};

  for (const symbol of symbols) {
    const key = symbol.toUpperCase();
    if (STABLECOIN_SYMBOLS.has(key)) {
      result[key] = 1;
      continue;
    }
    const cached = getCachedPrice(key);
    if (cached !== null) {
      result[key] = cached;
      continue;
    }
    const id = COINGECKO_IDS[key];
    if (id) {
      toFetch.push(id);
      symbolById[id] = key;
    }
  }

  if (toFetch.length === 0) return result;

  const ids = Array.from(new Set(toFetch)).join(",");
  const needsZigFallback = symbols.some((s) => s.toUpperCase() === "ZIG");
  const url = needsZigFallback
    ? `/api/coingecko?ids=${encodeURIComponent(ids)}&symbols=zig`
    : `/api/coingecko?ids=${encodeURIComponent(ids)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return result;
    const data = (await res.json()) as Record<string, { usd?: number }>;
    for (const [id, val] of Object.entries(data)) {
      const price = val?.usd ?? 0;
      const symbol = symbolById[id];
      if (symbol) {
        result[symbol] = price;
        setCachedPrice(symbol, price);
      }
    }
  } catch {
    // Offline or proxy error; leave result without new prices
  }

  return result;
}

const DEFAULT_DECIMALS = 6;

/**
 * Get display decimals for a balance from chain metadata.
 * Chain metadata may have denom_units (array of { denom, exponent }).
 * We use the display unit exponent, or the max exponent, or precision, or default 6.
 * When only the base unit (exponent 0) exists, we default to 6 so raw amounts are converted correctly.
 */
export function getDecimalsFromDenom(denom: any): number {
  if (!denom) return DEFAULT_DECIMALS;
  const units = denom.denom_units ?? denom.denomUnits ?? [];
  if (Array.isArray(units) && units.length > 0) {
    const display = denom.display;
    const displayUnit = display
      ? units.find((u: any) => u.denom === display)
      : null;
    if (displayUnit != null && typeof displayUnit.exponent === "number")
      return displayUnit.exponent;
    const exponents = units.map((u: any) =>
      typeof u.exponent === "number" ? u.exponent : 0,
    );
    const maxExp = Math.max(...exponents);
    // Only base unit (exponent 0) means we don't have display decimals; use default (e.g. 6 for Cosmos/IBC)
    if (maxExp > 0) return maxExp;
  }
  const prec = denom.precision;
  if (prec !== undefined && prec !== null && prec !== "") {
    const n = parseInt(String(prec), 10);
    if (!Number.isNaN(n) && n >= 0) return n;
  }
  return DEFAULT_DECIMALS;
}

/**
 * Convert raw amount string (base units) to human-readable number.
 */
export function toHumanAmount(
  amountStr: string | undefined,
  decimals: number,
): number {
  if (amountStr == null || amountStr === "") return 0;
  const amount = Number(amountStr);
  if (Number.isNaN(amount)) return 0;
  return amount / Math.pow(10, decimals);
}

/**
 * Format token amount for display with at most maxDecimals (default 2).
 */
export function formatHumanAmount(
  amountStr: string | undefined,
  decimals: number,
  maxDecimals: number = 2,
): string {
  const n = toHumanAmount(amountStr, decimals);
  if (n === 0) return "0";
  const opts: Intl.NumberFormatOptions = {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  };
  return n.toLocaleString(undefined, opts);
}
