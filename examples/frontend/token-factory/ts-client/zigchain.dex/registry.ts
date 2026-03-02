import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryParamsResponse } from "./types/zigchain/dex/query";
import { QueryAllPoolUidsRequest } from "./types/zigchain/dex/query";
import { MsgUpdateParamsResponse } from "./types/zigchain/dex/tx";
import { MsgCreatePool } from "./types/zigchain/dex/tx";
import { QueryParamsRequest } from "./types/zigchain/dex/query";
import { QueryGetPoolRequest } from "./types/zigchain/dex/query";
import { QueryGetPoolResponse } from "./types/zigchain/dex/query";
import { QueryGetPoolUidRequest } from "./types/zigchain/dex/query";
import { QuerySwapInRequest } from "./types/zigchain/dex/query";
import { Params } from "./types/zigchain/dex/params";
import { PoolPair } from "./types/zigchain/dex/pool";
import { DexPacketData } from "./types/zigchain/dex/packet";
import { QueryAllPoolRequest } from "./types/zigchain/dex/query";
import { QueryGetPoolsMetaRequest } from "./types/zigchain/dex/query";
import { PoolUids } from "./types/zigchain/dex/pool_uids";
import { MsgRemoveLiquidity } from "./types/zigchain/dex/tx";
import { MsgRemoveLiquidityResponse } from "./types/zigchain/dex/tx";
import { PoolsMeta } from "./types/zigchain/dex/pools_meta";
import { Pool } from "./types/zigchain/dex/pool";
import { NoData } from "./types/zigchain/dex/packet";
import { QuerySwapInResponse } from "./types/zigchain/dex/query";
import { MsgAddLiquidityResponse } from "./types/zigchain/dex/tx";
import { QueryAllPoolUidsResponse } from "./types/zigchain/dex/query";
import { QueryGetPoolUidResponse } from "./types/zigchain/dex/query";
import { MsgSwap } from "./types/zigchain/dex/tx";
import { MsgAddLiquidity } from "./types/zigchain/dex/tx";
import { GenesisState } from "./types/zigchain/dex/genesis";
import { QueryAllPoolResponse } from "./types/zigchain/dex/query";
import { QueryGetPoolsMetaResponse } from "./types/zigchain/dex/query";
import { MsgUpdateParams } from "./types/zigchain/dex/tx";
import { MsgCreatePoolResponse } from "./types/zigchain/dex/tx";
import { MsgSwapResponse } from "./types/zigchain/dex/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/zigchain.dex.QueryParamsResponse", QueryParamsResponse],
    ["/zigchain.dex.QueryAllPoolUidsRequest", QueryAllPoolUidsRequest],
    ["/zigchain.dex.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/zigchain.dex.MsgCreatePool", MsgCreatePool],
    ["/zigchain.dex.QueryParamsRequest", QueryParamsRequest],
    ["/zigchain.dex.QueryGetPoolRequest", QueryGetPoolRequest],
    ["/zigchain.dex.QueryGetPoolResponse", QueryGetPoolResponse],
    ["/zigchain.dex.QueryGetPoolUidRequest", QueryGetPoolUidRequest],
    ["/zigchain.dex.QuerySwapInRequest", QuerySwapInRequest],
    ["/zigchain.dex.Params", Params],
    ["/zigchain.dex.PoolPair", PoolPair],
    ["/zigchain.dex.DexPacketData", DexPacketData],
    ["/zigchain.dex.QueryAllPoolRequest", QueryAllPoolRequest],
    ["/zigchain.dex.QueryGetPoolsMetaRequest", QueryGetPoolsMetaRequest],
    ["/zigchain.dex.PoolUids", PoolUids],
    ["/zigchain.dex.MsgRemoveLiquidity", MsgRemoveLiquidity],
    ["/zigchain.dex.MsgRemoveLiquidityResponse", MsgRemoveLiquidityResponse],
    ["/zigchain.dex.PoolsMeta", PoolsMeta],
    ["/zigchain.dex.Pool", Pool],
    ["/zigchain.dex.NoData", NoData],
    ["/zigchain.dex.QuerySwapInResponse", QuerySwapInResponse],
    ["/zigchain.dex.MsgAddLiquidityResponse", MsgAddLiquidityResponse],
    ["/zigchain.dex.QueryAllPoolUidsResponse", QueryAllPoolUidsResponse],
    ["/zigchain.dex.QueryGetPoolUidResponse", QueryGetPoolUidResponse],
    ["/zigchain.dex.MsgSwap", MsgSwap],
    ["/zigchain.dex.MsgAddLiquidity", MsgAddLiquidity],
    ["/zigchain.dex.GenesisState", GenesisState],
    ["/zigchain.dex.QueryAllPoolResponse", QueryAllPoolResponse],
    ["/zigchain.dex.QueryGetPoolsMetaResponse", QueryGetPoolsMetaResponse],
    ["/zigchain.dex.MsgUpdateParams", MsgUpdateParams],
    ["/zigchain.dex.MsgCreatePoolResponse", MsgCreatePoolResponse],
    ["/zigchain.dex.MsgSwapResponse", MsgSwapResponse],
    
];

export { msgTypes }