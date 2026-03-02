import { chainClient } from "@/context/ChainContext";

// Fetch all tokens
export const fetchTokens = (page: string, limit?: string) => {
  return chainClient.ZigchainFactory.query.queryDenomAll({
    page: page,
    "pagination.limit": limit,
  } as any);
};

// Fetch metadata for tokens
export const fetchTokenMetadata = (limit: string) => {
  return chainClient.CosmosBankV1Beta1.query.queryDenomsMetadata({
    "pagination.limit": limit,
  });
};

// Fetch all pools
export const fetchPools = (page: string) => {
  return chainClient.ZigchainDex.query.queryListPool({
    page: page,
  } as any);
};

// Fetch all balances for an address
export const fetchBalances = (address: string, denom?: string) => {
  const query = {
    "pagination.limit": "1000",
  } as any;

  if (denom) {
    query.resolve_denom = denom;
  }

  return chainClient.CosmosBankV1Beta1.query.queryAllBalances(address, query);
};

// Fetch all balances for an address
export const fetchDenomBalance = (address: string, denom: string) => {
  return chainClient.CosmosBankV1Beta1.query.queryBalance(address, {
    "pagination.limit": "1000",
    denom: denom,
  } as any);
};

// Fetch pool data
export const getPoolId = async (tokenA: string, tokenB: string) => {
  const pool = await chainClient.ZigchainDex.query.queryGetPoolUid(
    tokenA.replaceAll("/", "'"),
    tokenB.replaceAll("/", "'")
  );
  return pool.data.poolUids?.poolId ?? null;
};

// Fetch metadata for tokens
export const getMetadata = async (limit: string) => {
  const response =
    await chainClient.CosmosBankV1Beta1.query.queryDenomsMetadata({
      "pagination.limit": limit,
    });
  const metadatas = response?.data.metadatas ?? [];
  const denomsWithMetadata = await Promise.all(
    metadatas.map(async (metadata: any) => {
      const extraDataResponse = await fetch(metadata.uri ?? "");
      const extraData = await extraDataResponse.json();
      return {
        ...metadata,
        ...extraData,
      };
    })
  );
  return denomsWithMetadata;
};

// Fetch swap estimate
export const fetchSwapEstimate = (
  poolId: string,
  token: string,
  amount: string
) => {
  const denom = token.replaceAll("/", "'");
  const coinIn = `${amount}${denom}`;
  return chainClient.ZigchainDex.query.querySwapIn(poolId, coinIn);
};
