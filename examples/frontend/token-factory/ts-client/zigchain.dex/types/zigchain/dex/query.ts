/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
import { Pool } from "./pool";
import { PoolUids } from "./pool_uids";
import { PoolsMeta } from "./pools_meta";

export const protobufPackage = "zigchain.dex";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

/** QueryGetPoolRequest gets a specific pool by its ID. */
export interface QueryGetPoolRequest {
  poolId: string;
}

/** QueryGetPoolResponse is the response type for the Query/GetPool RPC method. */
export interface QueryGetPoolResponse {
  pool: Pool | undefined;
}

/** QueryAllPoolRequest is the request type for the Query/AllPool RPC method. */
export interface QueryAllPoolRequest {
  pagination: PageRequest | undefined;
}

/** QueryAllPoolResponse is the response type for the Query/AllPool RPC method. */
export interface QueryAllPoolResponse {
  pool: Pool[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPoolsMetaRequest {
}

export interface QueryGetPoolsMetaResponse {
  PoolsMeta: PoolsMeta | undefined;
}

/** QueryGetPoolUidRequest gets a specific pool based on base and quote. */
export interface QueryGetPoolUidRequest {
  base: string;
  quote: string;
}

/** QueryGetPoolUidResponse is the response type for the Query/GetPool RPC method. */
export interface QueryGetPoolUidResponse {
  poolUids: PoolUids | undefined;
}

/** QueryAllPoolUidsRequest is the request type for the Query/AllPool RPC method. */
export interface QueryAllPoolUidsRequest {
  pagination: PageRequest | undefined;
}

/** QueryAllPoolUidsResponse is the response type for the Query/AllPool RPC method. */
export interface QueryAllPoolUidsResponse {
  poolUids: PoolUids[];
  pagination: PageResponse | undefined;
}

/** QuerySwapInRequest gets a specific pool by its ID and incoming token. */
export interface QuerySwapInRequest {
  poolId: string;
  coinIn: string;
}

/** QuerySwapInResponse returns amount of tokens given back given pool id and incoming. */
export interface QuerySwapInResponse {
  out:
    | Coin
    | undefined;
  /** string out = 1; */
  fee: Coin | undefined;
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

function createBaseQueryGetPoolRequest(): QueryGetPoolRequest {
  return { poolId: "" };
}

export const QueryGetPoolRequest = {
  encode(message: QueryGetPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolRequest {
    return { poolId: isSet(object.poolId) ? String(object.poolId) : "" };
  },

  toJSON(message: QueryGetPoolRequest): unknown {
    const obj: any = {};
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetPoolRequest>, I>>(base?: I): QueryGetPoolRequest {
    return QueryGetPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetPoolRequest>, I>>(object: I): QueryGetPoolRequest {
    const message = createBaseQueryGetPoolRequest();
    message.poolId = object.poolId ?? "";
    return message;
  },
};

function createBaseQueryGetPoolResponse(): QueryGetPoolResponse {
  return { pool: undefined };
}

export const QueryGetPoolResponse = {
  encode(message: QueryGetPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool = Pool.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolResponse {
    return { pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined };
  },

  toJSON(message: QueryGetPoolResponse): unknown {
    const obj: any = {};
    if (message.pool !== undefined) {
      obj.pool = Pool.toJSON(message.pool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetPoolResponse>, I>>(base?: I): QueryGetPoolResponse {
    return QueryGetPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetPoolResponse>, I>>(object: I): QueryGetPoolResponse {
    const message = createBaseQueryGetPoolResponse();
    message.pool = (object.pool !== undefined && object.pool !== null) ? Pool.fromPartial(object.pool) : undefined;
    return message;
  },
};

function createBaseQueryAllPoolRequest(): QueryAllPoolRequest {
  return { pagination: undefined };
}

export const QueryAllPoolRequest = {
  encode(message: QueryAllPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolRequest();
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

  fromJSON(object: any): QueryAllPoolRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPoolRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllPoolRequest>, I>>(base?: I): QueryAllPoolRequest {
    return QueryAllPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllPoolRequest>, I>>(object: I): QueryAllPoolRequest {
    const message = createBaseQueryAllPoolRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPoolResponse(): QueryAllPoolResponse {
  return { pool: [], pagination: undefined };
}

export const QueryAllPoolResponse = {
  encode(message: QueryAllPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pool) {
      Pool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool.push(Pool.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllPoolResponse {
    return {
      pool: Array.isArray(object?.pool) ? object.pool.map((e: any) => Pool.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPoolResponse): unknown {
    const obj: any = {};
    if (message.pool?.length) {
      obj.pool = message.pool.map((e) => Pool.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllPoolResponse>, I>>(base?: I): QueryAllPoolResponse {
    return QueryAllPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllPoolResponse>, I>>(object: I): QueryAllPoolResponse {
    const message = createBaseQueryAllPoolResponse();
    message.pool = object.pool?.map((e) => Pool.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPoolsMetaRequest(): QueryGetPoolsMetaRequest {
  return {};
}

export const QueryGetPoolsMetaRequest = {
  encode(_: QueryGetPoolsMetaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolsMetaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolsMetaRequest();
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

  fromJSON(_: any): QueryGetPoolsMetaRequest {
    return {};
  },

  toJSON(_: QueryGetPoolsMetaRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetPoolsMetaRequest>, I>>(base?: I): QueryGetPoolsMetaRequest {
    return QueryGetPoolsMetaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetPoolsMetaRequest>, I>>(_: I): QueryGetPoolsMetaRequest {
    const message = createBaseQueryGetPoolsMetaRequest();
    return message;
  },
};

function createBaseQueryGetPoolsMetaResponse(): QueryGetPoolsMetaResponse {
  return { PoolsMeta: undefined };
}

export const QueryGetPoolsMetaResponse = {
  encode(message: QueryGetPoolsMetaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.PoolsMeta !== undefined) {
      PoolsMeta.encode(message.PoolsMeta, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolsMetaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolsMetaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.PoolsMeta = PoolsMeta.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolsMetaResponse {
    return { PoolsMeta: isSet(object.PoolsMeta) ? PoolsMeta.fromJSON(object.PoolsMeta) : undefined };
  },

  toJSON(message: QueryGetPoolsMetaResponse): unknown {
    const obj: any = {};
    if (message.PoolsMeta !== undefined) {
      obj.PoolsMeta = PoolsMeta.toJSON(message.PoolsMeta);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetPoolsMetaResponse>, I>>(base?: I): QueryGetPoolsMetaResponse {
    return QueryGetPoolsMetaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetPoolsMetaResponse>, I>>(object: I): QueryGetPoolsMetaResponse {
    const message = createBaseQueryGetPoolsMetaResponse();
    message.PoolsMeta = (object.PoolsMeta !== undefined && object.PoolsMeta !== null)
      ? PoolsMeta.fromPartial(object.PoolsMeta)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPoolUidRequest(): QueryGetPoolUidRequest {
  return { base: "", quote: "" };
}

export const QueryGetPoolUidRequest = {
  encode(message: QueryGetPoolUidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base !== "") {
      writer.uint32(10).string(message.base);
    }
    if (message.quote !== "") {
      writer.uint32(18).string(message.quote);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolUidRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolUidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.quote = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolUidRequest {
    return {
      base: isSet(object.base) ? String(object.base) : "",
      quote: isSet(object.quote) ? String(object.quote) : "",
    };
  },

  toJSON(message: QueryGetPoolUidRequest): unknown {
    const obj: any = {};
    if (message.base !== "") {
      obj.base = message.base;
    }
    if (message.quote !== "") {
      obj.quote = message.quote;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetPoolUidRequest>, I>>(base?: I): QueryGetPoolUidRequest {
    return QueryGetPoolUidRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetPoolUidRequest>, I>>(object: I): QueryGetPoolUidRequest {
    const message = createBaseQueryGetPoolUidRequest();
    message.base = object.base ?? "";
    message.quote = object.quote ?? "";
    return message;
  },
};

function createBaseQueryGetPoolUidResponse(): QueryGetPoolUidResponse {
  return { poolUids: undefined };
}

export const QueryGetPoolUidResponse = {
  encode(message: QueryGetPoolUidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolUids !== undefined) {
      PoolUids.encode(message.poolUids, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPoolUidResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolUidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolUids = PoolUids.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetPoolUidResponse {
    return { poolUids: isSet(object.poolUids) ? PoolUids.fromJSON(object.poolUids) : undefined };
  },

  toJSON(message: QueryGetPoolUidResponse): unknown {
    const obj: any = {};
    if (message.poolUids !== undefined) {
      obj.poolUids = PoolUids.toJSON(message.poolUids);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetPoolUidResponse>, I>>(base?: I): QueryGetPoolUidResponse {
    return QueryGetPoolUidResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetPoolUidResponse>, I>>(object: I): QueryGetPoolUidResponse {
    const message = createBaseQueryGetPoolUidResponse();
    message.poolUids = (object.poolUids !== undefined && object.poolUids !== null)
      ? PoolUids.fromPartial(object.poolUids)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPoolUidsRequest(): QueryAllPoolUidsRequest {
  return { pagination: undefined };
}

export const QueryAllPoolUidsRequest = {
  encode(message: QueryAllPoolUidsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPoolUidsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolUidsRequest();
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

  fromJSON(object: any): QueryAllPoolUidsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPoolUidsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllPoolUidsRequest>, I>>(base?: I): QueryAllPoolUidsRequest {
    return QueryAllPoolUidsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllPoolUidsRequest>, I>>(object: I): QueryAllPoolUidsRequest {
    const message = createBaseQueryAllPoolUidsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPoolUidsResponse(): QueryAllPoolUidsResponse {
  return { poolUids: [], pagination: undefined };
}

export const QueryAllPoolUidsResponse = {
  encode(message: QueryAllPoolUidsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolUids) {
      PoolUids.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPoolUidsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolUidsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolUids.push(PoolUids.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllPoolUidsResponse {
    return {
      poolUids: Array.isArray(object?.poolUids) ? object.poolUids.map((e: any) => PoolUids.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPoolUidsResponse): unknown {
    const obj: any = {};
    if (message.poolUids?.length) {
      obj.poolUids = message.poolUids.map((e) => PoolUids.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllPoolUidsResponse>, I>>(base?: I): QueryAllPoolUidsResponse {
    return QueryAllPoolUidsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllPoolUidsResponse>, I>>(object: I): QueryAllPoolUidsResponse {
    const message = createBaseQueryAllPoolUidsResponse();
    message.poolUids = object.poolUids?.map((e) => PoolUids.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySwapInRequest(): QuerySwapInRequest {
  return { poolId: "", coinIn: "" };
}

export const QuerySwapInRequest = {
  encode(message: QuerySwapInRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.coinIn !== "") {
      writer.uint32(18).string(message.coinIn);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwapInRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySwapInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.coinIn = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySwapInRequest {
    return {
      poolId: isSet(object.poolId) ? String(object.poolId) : "",
      coinIn: isSet(object.coinIn) ? String(object.coinIn) : "",
    };
  },

  toJSON(message: QuerySwapInRequest): unknown {
    const obj: any = {};
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    if (message.coinIn !== "") {
      obj.coinIn = message.coinIn;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySwapInRequest>, I>>(base?: I): QuerySwapInRequest {
    return QuerySwapInRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySwapInRequest>, I>>(object: I): QuerySwapInRequest {
    const message = createBaseQuerySwapInRequest();
    message.poolId = object.poolId ?? "";
    message.coinIn = object.coinIn ?? "";
    return message;
  },
};

function createBaseQuerySwapInResponse(): QuerySwapInResponse {
  return { out: undefined, fee: undefined };
}

export const QuerySwapInResponse = {
  encode(message: QuerySwapInResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.out !== undefined) {
      Coin.encode(message.out, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwapInResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySwapInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.out = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fee = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySwapInResponse {
    return {
      out: isSet(object.out) ? Coin.fromJSON(object.out) : undefined,
      fee: isSet(object.fee) ? Coin.fromJSON(object.fee) : undefined,
    };
  },

  toJSON(message: QuerySwapInResponse): unknown {
    const obj: any = {};
    if (message.out !== undefined) {
      obj.out = Coin.toJSON(message.out);
    }
    if (message.fee !== undefined) {
      obj.fee = Coin.toJSON(message.fee);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySwapInResponse>, I>>(base?: I): QuerySwapInResponse {
    return QuerySwapInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySwapInResponse>, I>>(object: I): QuerySwapInResponse {
    const message = createBaseQuerySwapInResponse();
    message.out = (object.out !== undefined && object.out !== null) ? Coin.fromPartial(object.out) : undefined;
    message.fee = (object.fee !== undefined && object.fee !== null) ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Pool items. */
  GetPool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse>;
  /** Queries a list of Pool items. */
  ListPool(request: QueryAllPoolRequest): Promise<QueryAllPoolResponse>;
  /** Queries a PoolsMeta by index. */
  GetPoolsMeta(request: QueryGetPoolsMetaRequest): Promise<QueryGetPoolsMetaResponse>;
  /** Queries a list of PoolUids items. */
  GetPoolUid(request: QueryGetPoolUidRequest): Promise<QueryGetPoolUidResponse>;
  /** Queries a list of PoolUids items. */
  ListPoolUids(request: QueryAllPoolUidsRequest): Promise<QueryAllPoolUidsResponse>;
  /** Queries a list of SwapIn items. */
  SwapIn(request: QuerySwapInRequest): Promise<QuerySwapInResponse>;
}

export const QueryServiceName = "zigchain.dex.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.GetPool = this.GetPool.bind(this);
    this.ListPool = this.ListPool.bind(this);
    this.GetPoolsMeta = this.GetPoolsMeta.bind(this);
    this.GetPoolUid = this.GetPoolUid.bind(this);
    this.ListPoolUids = this.ListPoolUids.bind(this);
    this.SwapIn = this.SwapIn.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  GetPool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse> {
    const data = QueryGetPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetPool", data);
    return promise.then((data) => QueryGetPoolResponse.decode(_m0.Reader.create(data)));
  }

  ListPool(request: QueryAllPoolRequest): Promise<QueryAllPoolResponse> {
    const data = QueryAllPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListPool", data);
    return promise.then((data) => QueryAllPoolResponse.decode(_m0.Reader.create(data)));
  }

  GetPoolsMeta(request: QueryGetPoolsMetaRequest): Promise<QueryGetPoolsMetaResponse> {
    const data = QueryGetPoolsMetaRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetPoolsMeta", data);
    return promise.then((data) => QueryGetPoolsMetaResponse.decode(_m0.Reader.create(data)));
  }

  GetPoolUid(request: QueryGetPoolUidRequest): Promise<QueryGetPoolUidResponse> {
    const data = QueryGetPoolUidRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetPoolUid", data);
    return promise.then((data) => QueryGetPoolUidResponse.decode(_m0.Reader.create(data)));
  }

  ListPoolUids(request: QueryAllPoolUidsRequest): Promise<QueryAllPoolUidsResponse> {
    const data = QueryAllPoolUidsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListPoolUids", data);
    return promise.then((data) => QueryAllPoolUidsResponse.decode(_m0.Reader.create(data)));
  }

  SwapIn(request: QuerySwapInRequest): Promise<QuerySwapInResponse> {
    const data = QuerySwapInRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SwapIn", data);
    return promise.then((data) => QuerySwapInResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
