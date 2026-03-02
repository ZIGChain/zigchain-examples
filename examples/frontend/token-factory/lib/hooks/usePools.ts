import { fetchPools } from "@/lib/utils/fetchers";
import { Denom } from "@/ts-client/zigchain.factory/types/zigchain/factory/denom";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useTokenMetadata } from "./useTokenMetadata";

interface Pool {
  poolId?: string;
  coins?: { denom?: string }[];
}

interface PoolWithMetadata extends Pool {
  tokens: Denom[];
}

export const usePools = (page: number) => {
  const {
    data: poolsData,
    error: poolsError,
    mutate: mutatePools,
  } = useSWR(`${page}`, fetchPools);

  const { tokenMetadata } = useTokenMetadata("1000");

  const [poolsWithMetadata, setPoolsWithMetadata] = useState<
    PoolWithMetadata[]
  >([]);

  useEffect(() => {
    const getPoolsWithMetadata = async () => {
      if (!poolsData || !tokenMetadata) return;

      const pools = poolsData?.data?.pool ?? [];
      const metadatas = tokenMetadata ?? [];

      const poolsWithMetadata = await Promise.all(
        pools.map(async (pool: Pool) => {
          const tokens =
            pool.coins?.map((coin) => {
              const metadata = metadatas.find(
                (meta: any) => meta.base === coin.denom
              );

              return {
                ...coin,
                metadata,
              };
            }) || [];

          return {
            ...pool,
            tokens,
          };
        })
      );

      setPoolsWithMetadata(poolsWithMetadata as any);
    };

    getPoolsWithMetadata();
  }, [poolsData, tokenMetadata]);

  return {
    poolsWithMetadata,
    isLoading: !poolsData || !tokenMetadata,
    poolsError,
    mutatePools,
  };
};
