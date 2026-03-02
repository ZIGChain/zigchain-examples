import { NextRequest, NextResponse } from "next/server";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const EXTRA_PARAMS =
  "&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true";

type SimplePriceData = {
  usd?: number;
  usd_24hr_change?: number;
  usd_market_cap?: number;
  usd_24h_vol?: number;
};

/**
 * Proxy for CoinGecko simple/price (https://docs.coingecko.com/reference/simple-price).
 * GET /api/coingecko?ids=zignaly,cosmos
 * Optional: ?symbols=zig — fallback lookup by symbol when ids=zignaly returns nothing.
 */
export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");
  const symbols = request.nextUrl.searchParams.get("symbols");

  if (!ids?.trim() && !symbols?.trim()) {
    return NextResponse.json(
      { error: "Missing ids or symbols query parameter" },
      { status: 400 },
    );
  }

  const out: Record<string, SimplePriceData> = {};

  try {
    if (ids?.trim()) {
      const url = `${COINGECKO_BASE}/simple/price?ids=${encodeURIComponent(
        ids.trim(),
      )}&vs_currencies=usd${EXTRA_PARAMS}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as Record<string, SimplePriceData>;
        Object.assign(out, data);
      }
    }

    // Always try symbol lookup for ZIG when ids include zignaly (free tier often omits ids=zignaly)
    const wantZig =
      symbols?.toLowerCase().includes("zig") ||
      ids?.toLowerCase().includes("zignaly");
    if (wantZig || (symbols?.trim() && !ids?.trim())) {
      const symParam = symbols?.trim() || "zig";
      const url = `${COINGECKO_BASE}/simple/price?symbols=${encodeURIComponent(
        symParam,
      )}&include_tokens=top&vs_currencies=usd${EXTRA_PARAMS}`;
      try {
        const res = await fetch(url, {
          next: { revalidate: 60 },
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = (await res.json()) as Record<string, SimplePriceData>;
          for (const [k, v] of Object.entries(data)) {
            if (v?.usd != null && !out[k]) out[k] = v;
          }
        }
      } catch {
        // ignore
      }
    }

    return NextResponse.json(out);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 502 },
    );
  }
}
