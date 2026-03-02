import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string) => {
  if (!address || address.length < 5) {
    return address;
  }
  const prefix = address.slice(0, 5); // Keep first 5 characters
  const suffix = address.slice(-5); // Keep last 5 characters
  return `${prefix}...${suffix}`;
};

// Convert IPFS URLs to HTTP URLs using the configured gateway
export function convertIpfsToHttp(ipfsUrl: string): string {
  if (!ipfsUrl) return ipfsUrl;

  // If it's already an HTTP URL, return as is
  if (ipfsUrl.startsWith("http://") || ipfsUrl.startsWith("https://")) {
    return ipfsUrl;
  }

  // If it's an IPFS URL, convert it
  if (ipfsUrl.startsWith("ipfs://")) {
    const hash = ipfsUrl.replace("ipfs://", "");
    const gateway =
      process.env.NEXT_PUBLIC_GATEWAY_URL || "gateway.pinata.cloud";
    return `https://${gateway}/ipfs/${hash}`;
  }

  // If it looks like just a hash, add the gateway
  if (ipfsUrl.startsWith("Qm") || ipfsUrl.startsWith("baf")) {
    const gateway =
      process.env.NEXT_PUBLIC_GATEWAY_URL || "gateway.pinata.cloud";
    return `https://${gateway}/ipfs/${ipfsUrl}`;
  }

  // If it's a gateway URL without protocol (e.g., "gateway.com/ipfs/hash"), add https://
  if (ipfsUrl.includes("/ipfs/") && !ipfsUrl.startsWith("http")) {
    return `https://${ipfsUrl}`;
  }

  return ipfsUrl;
}

// Safe fetch with timeout and error handling
export async function safeFetch(
  url: string,
  timeout = 5000
): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      signal: controller.signal,
      mode: "cors",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    return response;
  } catch (error) {
    // Silently handle errors - don't clutter console for testnet data
    return null;
  }
}
