import { chainClient } from "@/context/ChainContext";

const DEFAULT_PAGINATION_LIMIT = "200";
const MAX_PAGINATION_REQUESTS = 100;

// Fetch all tokens by walking pagination.next_key
export const fetchTokens = async (limit: string = DEFAULT_PAGINATION_LIMIT) => {
  const allDenoms: any[] = [];
  let nextKey: string | undefined = undefined;
  let requestCount = 0;

  do {
    const response = await chainClient.ZigchainFactory.query.queryDenomAll({
      "pagination.key": nextKey,
      "pagination.limit": limit,
    });

    allDenoms.push(...(response?.data?.denom ?? []));
    nextKey = response?.data?.pagination?.next_key;
    requestCount += 1;
  } while (nextKey && requestCount < MAX_PAGINATION_REQUESTS);

  return {
    data: {
      denom: allDenoms,
    },
  };
};

// Fetch all metadata by walking pagination.next_key
export const fetchTokenMetadata = async (
  limit: string = DEFAULT_PAGINATION_LIMIT,
) => {
  const allMetadata: any[] = [];
  let nextKey: string | undefined = undefined;
  let requestCount = 0;

  do {
    const response =
      await chainClient.CosmosBankV1Beta1.query.queryDenomsMetadata({
        "pagination.key": nextKey,
        "pagination.limit": limit,
      });

    allMetadata.push(...(response?.data?.metadatas ?? []));
    nextKey = response?.data?.pagination?.next_key;
    requestCount += 1;
  } while (nextKey && requestCount < MAX_PAGINATION_REQUESTS);

  return {
    data: {
      metadatas: allMetadata,
    },
  };
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
    tokenB.replaceAll("/", "'"),
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
    }),
  );
  return denomsWithMetadata;
};

// Fetch swap estimate
export const fetchSwapEstimate = (
  poolId: string,
  token: string,
  amount: string,
) => {
  const denom = token.replaceAll("/", "'");
  const coinIn = `${amount}${denom}`;
  return chainClient.ZigchainDex.query.querySwapIn(poolId, coinIn);
};
