import {
  fetchTokenPrices,
  getStablecoinOrCachedPrice,
} from "@/lib/utils/tokenPrices";
import { useEffect, useState } from "react";

/**
 * Fetches USD prices for the given token symbols.
 * Returns a map of uppercase symbol -> price (0 if unknown).
 */
export function useTokenPrices(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const normalized = Array.from(
      new Set(symbols.map((s) => (s || "").toUpperCase()).filter(Boolean)),
    );
    if (normalized.length === 0) {
      setPrices({});
      return;
    }

    const initial: Record<string, number> = {};
    for (const sym of normalized) {
      const cached = getStablecoinOrCachedPrice(sym);
      if (cached !== null) initial[sym] = cached;
    }
    setPrices((prev) => ({ ...prev, ...initial }));

    fetchTokenPrices(normalized).then((next) => {
      setPrices((prev) => ({ ...prev, ...next }));
    });
  }, [symbols.join(",")]);

  return prices;
}
