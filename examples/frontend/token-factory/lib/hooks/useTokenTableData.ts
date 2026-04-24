import { fetchTokenMetadata, fetchTokens } from "@/lib/utils/fetchers";
import { Denom } from "@/ts-client/zigchain.factory/types/zigchain/factory/denom";
import { convertIpfsToHttp, safeFetch } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useTokenTableData = () => {
  const {
    data: tokensData,
    error: tokensError,
    mutate: mutateTokens,
  } = useSWR("tokens-all", () => fetchTokens());
  const {
    data: metadataData,
    error: metadataError,
    mutate: mutateMetadata,
  } = useSWR("metadata-all", () => fetchTokenMetadata());

  const [tokensWithMetadata, setTokensWithMetadata] = useState<Denom[]>([]);

  useEffect(() => {
    const getTokensWithMetadata = async () => {
      if (!tokensData || !metadataData) return;

      const tokens = tokensData?.data?.denom ?? [];
      const metadatas = metadataData?.data?.metadatas ?? [];

      const tokensWithMetadata = await Promise.all(
        tokens.map(async (token) => {
          const metadata = metadatas.find(
            (meta: any) => meta.base === token.denom,
          );

          if (!metadata) {
            return token;
          }

          if (!metadata.uri) {
            return {
              ...token,
              metadata,
            };
          }

          try {
            const httpUrl = convertIpfsToHttp(metadata.uri);
            const extraDataResponse = await safeFetch(httpUrl);

            if (!extraDataResponse) {
              // Silently return token with metadata if fetch fails
              return {
                ...token,
                metadata,
              };
            }

            // Check if the response is JSON
            const contentType = extraDataResponse.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const fullMetadata = await extraDataResponse.json();

              // Extract extraData from the fullMetadata structure
              const extraData = {
                icon: fullMetadata.icon || "",
                websiteUrl: fullMetadata.websiteUrl || "",
                twitter: fullMetadata.twitter || "",
                telegram: fullMetadata.telegram || "",
                description: fullMetadata.description || "",
                fullExtraData: fullMetadata.fullExtraData || fullMetadata,
              };

              return {
                ...token,
                metadata: {
                  ...metadata,
                  fullMetadata: fullMetadata,
                },
                extraData,
              };
            } else {
              // If it's not JSON (e.g., image), just return the metadata with the converted URL
              return {
                ...token,
                metadata,
                extraData: {
                  icon: httpUrl,
                  image: httpUrl,
                },
              };
            }
          } catch (error) {
            // Silently return token with metadata if there's an error
            return {
              ...token,
              metadata,
            };
          }
        }),
      );

      setTokensWithMetadata(tokensWithMetadata as any);
    };

    getTokensWithMetadata();
  }, [tokensData, metadataData]);

  return {
    tokensWithMetadata,
    isLoading: !tokensData || !metadataData,
    tokensError,
    metadataError,
    mutateTokens,
    mutateMetadata,
  };
};
