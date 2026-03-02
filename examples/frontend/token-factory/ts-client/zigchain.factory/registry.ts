import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryAllDenomsByAdminRequest } from "./types/zigchain/factory/query";
import { MsgUpdateDenomMaxSupplyResponse } from "./types/zigchain/factory/tx";
import { MsgBurnTokens } from "./types/zigchain/factory/tx";
import { QueryDenomByAdminRequest } from "./types/zigchain/factory/query";
import { QueryAllDenomAuthRequest } from "./types/zigchain/factory/query";
import { MsgUpdateDenomAuth } from "./types/zigchain/factory/tx";
import { MsgUpdateDenomURI } from "./types/zigchain/factory/tx";
import { MsgUpdateDenomMetadataAuth } from "./types/zigchain/factory/tx";
import { MsgSetDenomMetadataResponse } from "./types/zigchain/factory/tx";
import { Denom } from "./types/zigchain/factory/denom";
import { QueryDenomByAdminResponse } from "./types/zigchain/factory/query";
import { MsgUpdateDenomAuthResponse } from "./types/zigchain/factory/tx";
import { MsgUpdateDenomMaxSupply } from "./types/zigchain/factory/tx";
import { MsgUpdateDenomMetadataAuthResponse } from "./types/zigchain/factory/tx";
import { Params } from "./types/zigchain/factory/params";
import { QueryGetDenomAuthRequest } from "./types/zigchain/factory/query";
import { MsgMintAndSendTokensResponse } from "./types/zigchain/factory/tx";
import { MsgSetDenomMetadata } from "./types/zigchain/factory/tx";
import { DenomAuth } from "./types/zigchain/factory/denom_auth";
import { MsgMintAndSendTokens } from "./types/zigchain/factory/tx";
import { GenesisState } from "./types/zigchain/factory/genesis";
import { QueryAllDenomRequest } from "./types/zigchain/factory/query";
import { QueryAllDenomResponse } from "./types/zigchain/factory/query";
import { QueryDenomAuthResponse } from "./types/zigchain/factory/query";
import { MsgUpdateParams } from "./types/zigchain/factory/tx";
import { MsgCreateDenom } from "./types/zigchain/factory/tx";
import { MsgCreateDenomResponse } from "./types/zigchain/factory/tx";
import { MsgUpdateDenomURIResponse } from "./types/zigchain/factory/tx";
import { QueryParamsResponse } from "./types/zigchain/factory/query";
import { QueryGetDenomRequest } from "./types/zigchain/factory/query";
import { QueryAllDenomsByAdminResponse } from "./types/zigchain/factory/query";
import { QueryAllDenomAuthResponse } from "./types/zigchain/factory/query";
import { QueryParamsRequest } from "./types/zigchain/factory/query";
import { QueryDenomResponse } from "./types/zigchain/factory/query";
import { MsgUpdateParamsResponse } from "./types/zigchain/factory/tx";
import { MsgBurnTokensResponse } from "./types/zigchain/factory/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/zigchain.factory.QueryAllDenomsByAdminRequest", QueryAllDenomsByAdminRequest],
    ["/zigchain.factory.MsgUpdateDenomMaxSupplyResponse", MsgUpdateDenomMaxSupplyResponse],
    ["/zigchain.factory.MsgBurnTokens", MsgBurnTokens],
    ["/zigchain.factory.QueryDenomByAdminRequest", QueryDenomByAdminRequest],
    ["/zigchain.factory.QueryAllDenomAuthRequest", QueryAllDenomAuthRequest],
    ["/zigchain.factory.MsgUpdateDenomAuth", MsgUpdateDenomAuth],
    ["/zigchain.factory.MsgUpdateDenomURI", MsgUpdateDenomURI],
    ["/zigchain.factory.MsgUpdateDenomMetadataAuth", MsgUpdateDenomMetadataAuth],
    ["/zigchain.factory.MsgSetDenomMetadataResponse", MsgSetDenomMetadataResponse],
    ["/zigchain.factory.Denom", Denom],
    ["/zigchain.factory.QueryDenomByAdminResponse", QueryDenomByAdminResponse],
    ["/zigchain.factory.MsgUpdateDenomAuthResponse", MsgUpdateDenomAuthResponse],
    ["/zigchain.factory.MsgUpdateDenomMaxSupply", MsgUpdateDenomMaxSupply],
    ["/zigchain.factory.MsgUpdateDenomMetadataAuthResponse", MsgUpdateDenomMetadataAuthResponse],
    ["/zigchain.factory.Params", Params],
    ["/zigchain.factory.QueryGetDenomAuthRequest", QueryGetDenomAuthRequest],
    ["/zigchain.factory.MsgMintAndSendTokensResponse", MsgMintAndSendTokensResponse],
    ["/zigchain.factory.MsgSetDenomMetadata", MsgSetDenomMetadata],
    ["/zigchain.factory.DenomAuth", DenomAuth],
    ["/zigchain.factory.MsgMintAndSendTokens", MsgMintAndSendTokens],
    ["/zigchain.factory.GenesisState", GenesisState],
    ["/zigchain.factory.QueryAllDenomRequest", QueryAllDenomRequest],
    ["/zigchain.factory.QueryAllDenomResponse", QueryAllDenomResponse],
    ["/zigchain.factory.QueryDenomAuthResponse", QueryDenomAuthResponse],
    ["/zigchain.factory.MsgUpdateParams", MsgUpdateParams],
    ["/zigchain.factory.MsgCreateDenom", MsgCreateDenom],
    ["/zigchain.factory.MsgCreateDenomResponse", MsgCreateDenomResponse],
    ["/zigchain.factory.MsgUpdateDenomURIResponse", MsgUpdateDenomURIResponse],
    ["/zigchain.factory.QueryParamsResponse", QueryParamsResponse],
    ["/zigchain.factory.QueryGetDenomRequest", QueryGetDenomRequest],
    ["/zigchain.factory.QueryAllDenomsByAdminResponse", QueryAllDenomsByAdminResponse],
    ["/zigchain.factory.QueryAllDenomAuthResponse", QueryAllDenomAuthResponse],
    ["/zigchain.factory.QueryParamsRequest", QueryParamsRequest],
    ["/zigchain.factory.QueryDenomResponse", QueryDenomResponse],
    ["/zigchain.factory.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/zigchain.factory.MsgBurnTokensResponse", MsgBurnTokensResponse],
    
];

export { msgTypes }