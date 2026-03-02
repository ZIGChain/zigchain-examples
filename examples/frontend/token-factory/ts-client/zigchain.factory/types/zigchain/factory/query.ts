/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Denom } from "./denom";
import { DenomAuth } from "./denom_auth";
import { Params } from "./params";

export const protobufPackage = "zigchain.factory";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

/** QueryGetDenomRequest get denom info by denom. */
export interface QueryGetDenomRequest {
  denom: string;
}

/** QueryDenomResponse is response type for the Query/DenomByAdmin RPC method. */
export interface QueryDenomResponse {
  denom: string;
  supply: number;
  maxSupply: number;
  canChangeMaxSupply: boolean;
  creator: string;
  bankAdmin: string;
  metadataAdmin: string;
}

/** QueryDenomByOwnerRequest is request type for the Query/DenomByOwner RPC method. */
export interface QueryDenomByAdminRequest {
  admin: string;
  pagination: PageRequest | undefined;
}

/** QueryDenomByOwnerResponse is response type for the Query/DenomByOwner RPC method. */
export interface QueryAllDenomRequest {
  pagination: PageRequest | undefined;
}

/** QueryDenomByOwnerResponse is response type for the Query/QueryAllDenom RPC method. */
export interface QueryAllDenomResponse {
  denom: Denom[];
  pagination: PageResponse | undefined;
}

/** QueryDenomByOwnerResponse is response type for the Query/QueryDenomByAdmin RPC method. */
export interface QueryDenomByAdminResponse {
  denoms: string[];
  pagination: PageResponse | undefined;
}

/** QueryDenomByOwnerResponse is response type for the Query/DenomByAdmin RPC method. */
export interface QueryAllDenomsByAdminRequest {
  admin: string;
  pagination: PageRequest | undefined;
}

/** QueryAllDenomsByAdminResponse is response type for the Query/DenomByOwner RPC method. */
export interface QueryAllDenomsByAdminResponse {
  denoms: string;
  pagination: PageResponse | undefined;
}

/** QueryGetDenomAuthRequest is request type for the Query/GetDenomAuth RPC method. */
export interface QueryGetDenomAuthRequest {
  denom: string;
}

/** QueryGetDenomAuthResponse is response type for the Query/GetDenomAuth RPC method. */
export interface QueryDenomAuthResponse {
  denomAuth: DenomAuth | undefined;
}

/** QueryListDenomAuthRequest is request type for the Query/ListDenomAuth RPC method. */
export interface QueryAllDenomAuthRequest {
  pagination: PageRequest | undefined;
}

/** QueryListDenomAuthResponse is response type for the Query/ListDenomAuth RPC method. */
export interface QueryAllDenomAuthResponse {
  denomAuth: DenomAuth[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDenomRequest(): QueryGetDenomRequest {
  return { denom: "" };
}

export const QueryGetDenomRequest = {
  encode(message: QueryGetDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetDenomRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: QueryGetDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetDenomRequest>, I>>(base?: I): QueryGetDenomRequest {
    return QueryGetDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetDenomRequest>, I>>(object: I): QueryGetDenomRequest {
    const message = createBaseQueryGetDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomResponse(): QueryDenomResponse {
  return {
    denom: "",
    supply: 0,
    maxSupply: 0,
    canChangeMaxSupply: false,
    creator: "",
    bankAdmin: "",
    metadataAdmin: "",
  };
}

export const QueryDenomResponse = {
  encode(message: QueryDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.supply !== 0) {
      writer.uint32(16).int64(message.supply);
    }
    if (message.maxSupply !== 0) {
      writer.uint32(24).int64(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      writer.uint32(32).bool(message.canChangeMaxSupply);
    }
    if (message.creator !== "") {
      writer.uint32(42).string(message.creator);
    }
    if (message.bankAdmin !== "") {
      writer.uint32(50).string(message.bankAdmin);
    }
    if (message.metadataAdmin !== "") {
      writer.uint32(58).string(message.metadataAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.supply = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxSupply = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.canChangeMaxSupply = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.bankAdmin = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.metadataAdmin = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      supply: isSet(object.supply) ? Number(object.supply) : 0,
      maxSupply: isSet(object.maxSupply) ? Number(object.maxSupply) : 0,
      canChangeMaxSupply: isSet(object.canChangeMaxSupply) ? Boolean(object.canChangeMaxSupply) : false,
      creator: isSet(object.creator) ? String(object.creator) : "",
      bankAdmin: isSet(object.bankAdmin) ? String(object.bankAdmin) : "",
      metadataAdmin: isSet(object.metadataAdmin) ? String(object.metadataAdmin) : "",
    };
  },

  toJSON(message: QueryDenomResponse): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.supply !== 0) {
      obj.supply = Math.round(message.supply);
    }
    if (message.maxSupply !== 0) {
      obj.maxSupply = Math.round(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      obj.canChangeMaxSupply = message.canChangeMaxSupply;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.bankAdmin !== "") {
      obj.bankAdmin = message.bankAdmin;
    }
    if (message.metadataAdmin !== "") {
      obj.metadataAdmin = message.metadataAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(base?: I): QueryDenomResponse {
    return QueryDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(object: I): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    message.denom = object.denom ?? "";
    message.supply = object.supply ?? 0;
    message.maxSupply = object.maxSupply ?? 0;
    message.canChangeMaxSupply = object.canChangeMaxSupply ?? false;
    message.creator = object.creator ?? "";
    message.bankAdmin = object.bankAdmin ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
    return message;
  },
};

function createBaseQueryDenomByAdminRequest(): QueryDenomByAdminRequest {
  return { admin: "", pagination: undefined };
}

export const QueryDenomByAdminRequest = {
  encode(message: QueryDenomByAdminRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomByAdminRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomByAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomByAdminRequest {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomByAdminRequest): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomByAdminRequest>, I>>(base?: I): QueryDenomByAdminRequest {
    return QueryDenomByAdminRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomByAdminRequest>, I>>(object: I): QueryDenomByAdminRequest {
    const message = createBaseQueryDenomByAdminRequest();
    message.admin = object.admin ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDenomRequest(): QueryAllDenomRequest {
  return { pagination: undefined };
}

export const QueryAllDenomRequest = {
  encode(message: QueryAllDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllDenomRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllDenomRequest>, I>>(base?: I): QueryAllDenomRequest {
    return QueryAllDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllDenomRequest>, I>>(object: I): QueryAllDenomRequest {
    const message = createBaseQueryAllDenomRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDenomResponse(): QueryAllDenomResponse {
  return { denom: [], pagination: undefined };
}

export const QueryAllDenomResponse = {
  encode(message: QueryAllDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denom) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom.push(Denom.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomResponse {
    return {
      denom: Array.isArray(object?.denom) ? object.denom.map((e: any) => Denom.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDenomResponse): unknown {
    const obj: any = {};
    if (message.denom?.length) {
      obj.denom = message.denom.map((e) => Denom.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllDenomResponse>, I>>(base?: I): QueryAllDenomResponse {
    return QueryAllDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllDenomResponse>, I>>(object: I): QueryAllDenomResponse {
    const message = createBaseQueryAllDenomResponse();
    message.denom = object.denom?.map((e) => Denom.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomByAdminResponse(): QueryDenomByAdminResponse {
  return { denoms: [], pagination: undefined };
}

export const QueryDenomByAdminResponse = {
  encode(message: QueryDenomByAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomByAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomByAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomByAdminResponse {
    return {
      denoms: Array.isArray(object?.denoms) ? object.denoms.map((e: any) => String(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomByAdminResponse): unknown {
    const obj: any = {};
    if (message.denoms?.length) {
      obj.denoms = message.denoms;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomByAdminResponse>, I>>(base?: I): QueryDenomByAdminResponse {
    return QueryDenomByAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomByAdminResponse>, I>>(object: I): QueryDenomByAdminResponse {
    const message = createBaseQueryDenomByAdminResponse();
    message.denoms = object.denoms?.map((e) => e) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDenomsByAdminRequest(): QueryAllDenomsByAdminRequest {
  return { admin: "", pagination: undefined };
}

export const QueryAllDenomsByAdminRequest = {
  encode(message: QueryAllDenomsByAdminRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDenomsByAdminRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomsByAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomsByAdminRequest {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDenomsByAdminRequest): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllDenomsByAdminRequest>, I>>(base?: I): QueryAllDenomsByAdminRequest {
    return QueryAllDenomsByAdminRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllDenomsByAdminRequest>, I>>(object: I): QueryAllDenomsByAdminRequest {
    const message = createBaseQueryAllDenomsByAdminRequest();
    message.admin = object.admin ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDenomsByAdminResponse(): QueryAllDenomsByAdminResponse {
  return { denoms: "", pagination: undefined };
}

export const QueryAllDenomsByAdminResponse = {
  encode(message: QueryAllDenomsByAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denoms !== "") {
      writer.uint32(10).string(message.denoms);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDenomsByAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomsByAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomsByAdminResponse {
    return {
      denoms: isSet(object.denoms) ? String(object.denoms) : "",
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDenomsByAdminResponse): unknown {
    const obj: any = {};
    if (message.denoms !== "") {
      obj.denoms = message.denoms;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllDenomsByAdminResponse>, I>>(base?: I): QueryAllDenomsByAdminResponse {
    return QueryAllDenomsByAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllDenomsByAdminResponse>, I>>(
    object: I,
  ): QueryAllDenomsByAdminResponse {
    const message = createBaseQueryAllDenomsByAdminResponse();
    message.denoms = object.denoms ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDenomAuthRequest(): QueryGetDenomAuthRequest {
  return { denom: "" };
}

export const QueryGetDenomAuthRequest = {
  encode(message: QueryGetDenomAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDenomAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDenomAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetDenomAuthRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: QueryGetDenomAuthRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetDenomAuthRequest>, I>>(base?: I): QueryGetDenomAuthRequest {
    return QueryGetDenomAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetDenomAuthRequest>, I>>(object: I): QueryGetDenomAuthRequest {
    const message = createBaseQueryGetDenomAuthRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomAuthResponse(): QueryDenomAuthResponse {
  return { denomAuth: undefined };
}

export const QueryDenomAuthResponse = {
  encode(message: QueryDenomAuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomAuth !== undefined) {
      DenomAuth.encode(message.denomAuth, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomAuthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomAuth = DenomAuth.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomAuthResponse {
    return { denomAuth: isSet(object.denomAuth) ? DenomAuth.fromJSON(object.denomAuth) : undefined };
  },

  toJSON(message: QueryDenomAuthResponse): unknown {
    const obj: any = {};
    if (message.denomAuth !== undefined) {
      obj.denomAuth = DenomAuth.toJSON(message.denomAuth);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomAuthResponse>, I>>(base?: I): QueryDenomAuthResponse {
    return QueryDenomAuthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomAuthResponse>, I>>(object: I): QueryDenomAuthResponse {
    const message = createBaseQueryDenomAuthResponse();
    message.denomAuth = (object.denomAuth !== undefined && object.denomAuth !== null)
      ? DenomAuth.fromPartial(object.denomAuth)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDenomAuthRequest(): QueryAllDenomAuthRequest {
  return { pagination: undefined };
}

export const QueryAllDenomAuthRequest = {
  encode(message: QueryAllDenomAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDenomAuthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomAuthRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllDenomAuthRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllDenomAuthRequest>, I>>(base?: I): QueryAllDenomAuthRequest {
    return QueryAllDenomAuthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllDenomAuthRequest>, I>>(object: I): QueryAllDenomAuthRequest {
    const message = createBaseQueryAllDenomAuthRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDenomAuthResponse(): QueryAllDenomAuthResponse {
  return { denomAuth: [], pagination: undefined };
}

export const QueryAllDenomAuthResponse = {
  encode(message: QueryAllDenomAuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denomAuth) {
      DenomAuth.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDenomAuthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomAuth.push(DenomAuth.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomAuthResponse {
    return {
      denomAuth: Array.isArray(object?.denomAuth) ? object.denomAuth.map((e: any) => DenomAuth.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDenomAuthResponse): unknown {
    const obj: any = {};
    if (message.denomAuth?.length) {
      obj.denomAuth = message.denomAuth.map((e) => DenomAuth.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllDenomAuthResponse>, I>>(base?: I): QueryAllDenomAuthResponse {
    return QueryAllDenomAuthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllDenomAuthResponse>, I>>(object: I): QueryAllDenomAuthResponse {
    const message = createBaseQueryAllDenomAuthResponse();
    message.denomAuth = object.denomAuth?.map((e) => DenomAuth.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** QueryParams Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** QueryDenom Queries a list of Denom items. */
  Denom(request: QueryGetDenomRequest): Promise<QueryDenomResponse>;
  /** Queries a list of Denom items. */
  DenomAll(request: QueryAllDenomRequest): Promise<QueryAllDenomResponse>;
  /** QueryDenomsByAdmin Queries a list of Denom items. */
  DenomsByAdmin(request: QueryDenomByAdminRequest): Promise<QueryDenomByAdminResponse>;
  /** QueryGetDenomAuth a denom DenomAuth items. */
  DenomAuth(request: QueryGetDenomAuthRequest): Promise<QueryDenomAuthResponse>;
  /**
   * QueryListDenomAuth queries a list of DenomAuth items.
   * buf:lint:ignore RPC_RESPONSE_STANDARD_NAME
   */
  ListDenomAuth(request: QueryAllDenomAuthRequest): Promise<QueryAllDenomAuthResponse>;
}

export const QueryServiceName = "zigchain.factory.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Denom = this.Denom.bind(this);
    this.DenomAll = this.DenomAll.bind(this);
    this.DenomsByAdmin = this.DenomsByAdmin.bind(this);
    this.DenomAuth = this.DenomAuth.bind(this);
    this.ListDenomAuth = this.ListDenomAuth.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Denom(request: QueryGetDenomRequest): Promise<QueryDenomResponse> {
    const data = QueryGetDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Denom", data);
    return promise.then((data) => QueryDenomResponse.decode(_m0.Reader.create(data)));
  }

  DenomAll(request: QueryAllDenomRequest): Promise<QueryAllDenomResponse> {
    const data = QueryAllDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomAll", data);
    return promise.then((data) => QueryAllDenomResponse.decode(_m0.Reader.create(data)));
  }

  DenomsByAdmin(request: QueryDenomByAdminRequest): Promise<QueryDenomByAdminResponse> {
    const data = QueryDenomByAdminRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomsByAdmin", data);
    return promise.then((data) => QueryDenomByAdminResponse.decode(_m0.Reader.create(data)));
  }

  DenomAuth(request: QueryGetDenomAuthRequest): Promise<QueryDenomAuthResponse> {
    const data = QueryGetDenomAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomAuth", data);
    return promise.then((data) => QueryDenomAuthResponse.decode(_m0.Reader.create(data)));
  }

  ListDenomAuth(request: QueryAllDenomAuthRequest): Promise<QueryAllDenomAuthResponse> {
    const data = QueryAllDenomAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListDenomAuth", data);
    return promise.then((data) => QueryAllDenomAuthResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
