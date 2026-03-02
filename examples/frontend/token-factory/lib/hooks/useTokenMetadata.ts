import { fetchTokenMetadata } from "@/lib/utils/fetchers";
import { convertIpfsToHttp, safeFetch } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useTokenMetadata = (limit: string) => {
  const { data, error, mutate } = useSWR(limit, fetchTokenMetadata);

  const [tokenMetadata, setTokenMetadata] = useState<any[]>([]);

  useEffect(() => {
    const getTokenMetadata = async () => {
      if (!data) return;

      const metadatas = data?.data?.metadatas ?? [];

      const denomsWithMetadata = await Promise.all(
        metadatas.map(async (metadata: any) => {
          if (!metadata.uri) {
            return metadata;
          }

          try {
            const httpUrl = convertIpfsToHttp(metadata.uri);
            const extraDataResponse = await safeFetch(httpUrl);
            
            if (!extraDataResponse) {
              // Silently return metadata if fetch fails
              return metadata;
            }
            
            // Check if the response is JSON
            const contentType = extraDataResponse.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const extraData = await extraDataResponse.json();
              return {
                ...metadata,
                ...extraData,
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
            // Silently return metadata if there's an error
            return metadata;
          }
        })
      );

      setTokenMetadata(denomsWithMetadata);
    };

    getTokenMetadata();
  }, [data]);

  return {
    tokenMetadata,
    isLoading: !data,
    error,
    mutate,
  };
};
