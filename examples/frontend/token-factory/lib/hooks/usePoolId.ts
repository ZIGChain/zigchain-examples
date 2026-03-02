import { getPoolId } from "@/lib/utils/fetchers";
import { useEffect, useState } from "react";

export const usePoolId = (tokenA: string, tokenB: string) => {
  const [poolId, setPoolId] = useState<string | null>(null);
  useEffect(() => {
    if (!tokenA || !tokenB || tokenA === "" || tokenB === "") {
      setPoolId(null);
      return;
    }
    const fetch = async () => {
      const poolId = await getPoolId(tokenA, tokenB);
      setPoolId(poolId);
    };
    fetch();
  }, [tokenA, tokenB]);
  return poolId;
};
