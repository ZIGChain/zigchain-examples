import { fetchBalances, fetchTokenMetadata } from "@/lib/utils/fetchers";
import { KNOWN_TOKEN_METADATA } from "@/lib/utils/tokenDisplay";
import { Denom } from "@/ts-client/zigchain.factory/types/zigchain/factory/denom";
import { convertIpfsToHttp, safeFetch } from "@/lib/utils/utils";
import { useCallback, useEffect, useState } from "react";

interface Balance {
  denom?: Denom | undefined;
  amount?: string | undefined;
}

export const useBalances = (address: string | undefined) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getBalances = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const balanceData = await fetchBalances(address);
      const tokenMetadataData = await fetchTokenMetadata("1000");

      const metadatas = tokenMetadataData?.data?.metadatas ?? [];
      const denomsWithMetadata = await Promise.all(
        metadatas.map(async (metadata: any) => {
          if (!metadata.uri) {
            return metadata;
          }

          try {
            const httpUrl = convertIpfsToHttp(metadata.uri);
            const extraDataResponse = await safeFetch(httpUrl);

            if (!extraDataResponse) {
              // Silently return metadata without extra data if fetch fails
              return metadata;
            }

            // Check if the response is JSON
            const contentType = extraDataResponse.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const extraData = await extraDataResponse.json();
              // Preserve chain decimals metadata; IPFS data may not have denom_units
              const chainUnits = metadata.denom_units ?? metadata.denomUnits;
              const chainBase = metadata.base;
              const chainDisplay = metadata.display;
              return {
                ...metadata,
                ...extraData,
                base: chainBase ?? extraData.base,
                display: chainDisplay ?? extraData.display,
                denom_units:
                  Array.isArray(chainUnits) && chainUnits.length > 0
                    ? chainUnits
                    : extraData.denom_units ?? extraData.denomUnits,
                denomUnits:
                  Array.isArray(chainUnits) && chainUnits.length > 0
                    ? chainUnits
                    : extraData.denomUnits ?? extraData.denom_units,
              };
            } else {
              // If it's not JSON (e.g., image), just return the metadata with the converted URL
              return {
                ...metadata,
                icon: httpUrl,
                image: httpUrl,
              };
            }
          } catch (error) {
            // Silently return metadata without extra data if there's an error
            return metadata;
          }
        }),
      );

      if (!balanceData.data.balances) {
        setIsLoading(false);
        setBalances([]);
        return;
      }

      const balanceWithDenom = balanceData.data.balances.map((balance: any) => {
        const denom = denomsWithMetadata.find(
          (d: any) => balance.denom === d.base,
        );

        const fallback: any = {
          denom: balance.denom,
          description: "",
          ticker: balance.denom,
          precision: "",
          url: "",
          maxSupply: "",
          supply: "",
          canChangeMaxSupply: false,
          owner: "",
          twitter: "",
          telegram: "",
          icon: "",
          image: "",
        };

        // Same method as cbus/bsheep: use known metadata for native ZIG (azig) so name/symbol/icon show
        const known = KNOWN_TOKEN_METADATA[balance.denom];
        if (known) {
          Object.assign(fallback, known);
        }

        return {
          denom: denom || fallback,
          amount: balance.amount,
        };
      });

      setBalances(balanceWithDenom);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    getBalances();
  }, [address, getBalances]);

  return {
    balances,
    isLoading,
    error,
    mutate: getBalances,
  };
};
