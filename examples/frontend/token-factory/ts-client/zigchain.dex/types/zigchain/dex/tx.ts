/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Params } from "./params";

export const protobufPackage = "zigchain.dex";

/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params | undefined;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}

/** MsgCreatePool creates pool message needs base and token */
export interface MsgCreatePool {
  creator: string;
  base: Coin | undefined;
  quote: Coin | undefined;
}

/** MsgCreatePoolResponse defines the response structure for executing MsgCreatePool message. */
export interface MsgCreatePoolResponse {
  poolId: string;
  base: Coin | undefined;
  quote: Coin | undefined;
  lpToken: Coin | undefined;
}

/** MsgSwap swaps tokens from one to another */
export interface MsgSwap {
  creator: string;
  incoming: Coin | undefined;
  poolId: string;
}

/** MsgSwapResponse defines the response structure for executing MsgSwap message. */
export interface MsgSwapResponse {
  swapped: Coin | undefined;
  base: string;
  quote: string;
}

/** MsgAddLiquidity adds liquidity to the pool, from the base and quote tokens send in */
export interface MsgAddLiquidity {
  creator: string;
  poolId: string;
  base: Coin | undefined;
  quote: Coin | undefined;
}

/** MsgAddLiquidityResponse defines the response structure for executing MsgAddLiquidity message. */
export interface MsgAddLiquidityResponse {
  lptoken: Coin | undefined;
}

/** MsgRemoveLiquidity removes liquidity from the pool, from the lptoken send in */
export interface MsgRemoveLiquidity {
  creator: string;
  lptoken: Coin | undefined;
}

/** MsgRemoveLiquidityResponse defines the response structure for executing MsgRemoveLiquidity message. */
export interface MsgRemoveLiquidityResponse {
  base: Coin | undefined;
  quote: Coin | undefined;
}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgCreatePool(): MsgCreatePool {
  return { creator: "", base: undefined, quote: undefined };
}

export const MsgCreatePool = {
  encode(message: MsgCreatePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.base !== undefined) {
      Coin.encode(message.base, writer.uint32(18).fork()).ldelim();
    }
    if (message.quote !== undefined) {
      Coin.encode(message.quote, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.base = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.quote = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      base: isSet(object.base) ? Coin.fromJSON(object.base) : undefined,
      quote: isSet(object.quote) ? Coin.fromJSON(object.quote) : undefined,
    };
  },

  toJSON(message: MsgCreatePool): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.base !== undefined) {
      obj.base = Coin.toJSON(message.base);
    }
    if (message.quote !== undefined) {
      obj.quote = Coin.toJSON(message.quote);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreatePool>, I>>(base?: I): MsgCreatePool {
    return MsgCreatePool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreatePool>, I>>(object: I): MsgCreatePool {
    const message = createBaseMsgCreatePool();
    message.creator = object.creator ?? "";
    message.base = (object.base !== undefined && object.base !== null) ? Coin.fromPartial(object.base) : undefined;
    message.quote = (object.quote !== undefined && object.quote !== null) ? Coin.fromPartial(object.quote) : undefined;
    return message;
  },
};

function createBaseMsgCreatePoolResponse(): MsgCreatePoolResponse {
  return { poolId: "", base: undefined, quote: undefined, lpToken: undefined };
}

export const MsgCreatePoolResponse = {
  encode(message: MsgCreatePoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.base !== undefined) {
      Coin.encode(message.base, writer.uint32(18).fork()).ldelim();
    }
    if (message.quote !== undefined) {
      Coin.encode(message.quote, writer.uint32(26).fork()).ldelim();
    }
    if (message.lpToken !== undefined) {
      Coin.encode(message.lpToken, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePoolResponse();
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

          message.base = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.quote = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lpToken = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePoolResponse {
    return {
      poolId: isSet(object.poolId) ? String(object.poolId) : "",
      base: isSet(object.base) ? Coin.fromJSON(object.base) : undefined,
      quote: isSet(object.quote) ? Coin.fromJSON(object.quote) : undefined,
      lpToken: isSet(object.lpToken) ? Coin.fromJSON(object.lpToken) : undefined,
    };
  },

  toJSON(message: MsgCreatePoolResponse): unknown {
    const obj: any = {};
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    if (message.base !== undefined) {
      obj.base = Coin.toJSON(message.base);
    }
    if (message.quote !== undefined) {
      obj.quote = Coin.toJSON(message.quote);
    }
    if (message.lpToken !== undefined) {
      obj.lpToken = Coin.toJSON(message.lpToken);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreatePoolResponse>, I>>(base?: I): MsgCreatePoolResponse {
    return MsgCreatePoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreatePoolResponse>, I>>(object: I): MsgCreatePoolResponse {
    const message = createBaseMsgCreatePoolResponse();
    message.poolId = object.poolId ?? "";
    message.base = (object.base !== undefined && object.base !== null) ? Coin.fromPartial(object.base) : undefined;
    message.quote = (object.quote !== undefined && object.quote !== null) ? Coin.fromPartial(object.quote) : undefined;
    message.lpToken = (object.lpToken !== undefined && object.lpToken !== null)
      ? Coin.fromPartial(object.lpToken)
      : undefined;
    return message;
  },
};

function createBaseMsgSwap(): MsgSwap {
  return { creator: "", incoming: undefined, poolId: "" };
}

export const MsgSwap = {
  encode(message: MsgSwap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.incoming !== undefined) {
      Coin.encode(message.incoming, writer.uint32(18).fork()).ldelim();
    }
    if (message.poolId !== "") {
      writer.uint32(26).string(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.incoming = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): MsgSwap {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      incoming: isSet(object.incoming) ? Coin.fromJSON(object.incoming) : undefined,
      poolId: isSet(object.poolId) ? String(object.poolId) : "",
    };
  },

  toJSON(message: MsgSwap): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.incoming !== undefined) {
      obj.incoming = Coin.toJSON(message.incoming);
    }
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSwap>, I>>(base?: I): MsgSwap {
    return MsgSwap.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSwap>, I>>(object: I): MsgSwap {
    const message = createBaseMsgSwap();
    message.creator = object.creator ?? "";
    message.incoming = (object.incoming !== undefined && object.incoming !== null)
      ? Coin.fromPartial(object.incoming)
      : undefined;
    message.poolId = object.poolId ?? "";
    return message;
  },
};

function createBaseMsgSwapResponse(): MsgSwapResponse {
  return { swapped: undefined, base: "", quote: "" };
}

export const MsgSwapResponse = {
  encode(message: MsgSwapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swapped !== undefined) {
      Coin.encode(message.swapped, writer.uint32(10).fork()).ldelim();
    }
    if (message.base !== "") {
      writer.uint32(18).string(message.base);
    }
    if (message.quote !== "") {
      writer.uint32(26).string(message.quote);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.swapped = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.base = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): MsgSwapResponse {
    return {
      swapped: isSet(object.swapped) ? Coin.fromJSON(object.swapped) : undefined,
      base: isSet(object.base) ? String(object.base) : "",
      quote: isSet(object.quote) ? String(object.quote) : "",
    };
  },

  toJSON(message: MsgSwapResponse): unknown {
    const obj: any = {};
    if (message.swapped !== undefined) {
      obj.swapped = Coin.toJSON(message.swapped);
    }
    if (message.base !== "") {
      obj.base = message.base;
    }
    if (message.quote !== "") {
      obj.quote = message.quote;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSwapResponse>, I>>(base?: I): MsgSwapResponse {
    return MsgSwapResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSwapResponse>, I>>(object: I): MsgSwapResponse {
    const message = createBaseMsgSwapResponse();
    message.swapped = (object.swapped !== undefined && object.swapped !== null)
      ? Coin.fromPartial(object.swapped)
      : undefined;
    message.base = object.base ?? "";
    message.quote = object.quote ?? "";
    return message;
  },
};

function createBaseMsgAddLiquidity(): MsgAddLiquidity {
  return { creator: "", poolId: "", base: undefined, quote: undefined };
}

export const MsgAddLiquidity = {
  encode(message: MsgAddLiquidity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.poolId !== "") {
      writer.uint32(18).string(message.poolId);
    }
    if (message.base !== undefined) {
      Coin.encode(message.base, writer.uint32(26).fork()).ldelim();
    }
    if (message.quote !== undefined) {
      Coin.encode(message.quote, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddLiquidity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.base = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.quote = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddLiquidity {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      poolId: isSet(object.poolId) ? String(object.poolId) : "",
      base: isSet(object.base) ? Coin.fromJSON(object.base) : undefined,
      quote: isSet(object.quote) ? Coin.fromJSON(object.quote) : undefined,
    };
  },

  toJSON(message: MsgAddLiquidity): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    if (message.base !== undefined) {
      obj.base = Coin.toJSON(message.base);
    }
    if (message.quote !== undefined) {
      obj.quote = Coin.toJSON(message.quote);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddLiquidity>, I>>(base?: I): MsgAddLiquidity {
    return MsgAddLiquidity.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddLiquidity>, I>>(object: I): MsgAddLiquidity {
    const message = createBaseMsgAddLiquidity();
    message.creator = object.creator ?? "";
    message.poolId = object.poolId ?? "";
    message.base = (object.base !== undefined && object.base !== null) ? Coin.fromPartial(object.base) : undefined;
    message.quote = (object.quote !== undefined && object.quote !== null) ? Coin.fromPartial(object.quote) : undefined;
    return message;
  },
};

function createBaseMsgAddLiquidityResponse(): MsgAddLiquidityResponse {
  return { lptoken: undefined };
}

export const MsgAddLiquidityResponse = {
  encode(message: MsgAddLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lptoken !== undefined) {
      Coin.encode(message.lptoken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lptoken = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddLiquidityResponse {
    return { lptoken: isSet(object.lptoken) ? Coin.fromJSON(object.lptoken) : undefined };
  },

  toJSON(message: MsgAddLiquidityResponse): unknown {
    const obj: any = {};
    if (message.lptoken !== undefined) {
      obj.lptoken = Coin.toJSON(message.lptoken);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddLiquidityResponse>, I>>(base?: I): MsgAddLiquidityResponse {
    return MsgAddLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddLiquidityResponse>, I>>(object: I): MsgAddLiquidityResponse {
    const message = createBaseMsgAddLiquidityResponse();
    message.lptoken = (object.lptoken !== undefined && object.lptoken !== null)
      ? Coin.fromPartial(object.lptoken)
      : undefined;
    return message;
  },
};

function createBaseMsgRemoveLiquidity(): MsgRemoveLiquidity {
  return { creator: "", lptoken: undefined };
}

export const MsgRemoveLiquidity = {
  encode(message: MsgRemoveLiquidity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.lptoken !== undefined) {
      Coin.encode(message.lptoken, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveLiquidity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lptoken = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveLiquidity {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      lptoken: isSet(object.lptoken) ? Coin.fromJSON(object.lptoken) : undefined,
    };
  },

  toJSON(message: MsgRemoveLiquidity): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.lptoken !== undefined) {
      obj.lptoken = Coin.toJSON(message.lptoken);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveLiquidity>, I>>(base?: I): MsgRemoveLiquidity {
    return MsgRemoveLiquidity.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveLiquidity>, I>>(object: I): MsgRemoveLiquidity {
    const message = createBaseMsgRemoveLiquidity();
    message.creator = object.creator ?? "";
    message.lptoken = (object.lptoken !== undefined && object.lptoken !== null)
      ? Coin.fromPartial(object.lptoken)
      : undefined;
    return message;
  },
};

function createBaseMsgRemoveLiquidityResponse(): MsgRemoveLiquidityResponse {
  return { base: undefined, quote: undefined };
}

export const MsgRemoveLiquidityResponse = {
  encode(message: MsgRemoveLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base !== undefined) {
      Coin.encode(message.base, writer.uint32(10).fork()).ldelim();
    }
    if (message.quote !== undefined) {
      Coin.encode(message.quote, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.quote = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveLiquidityResponse {
    return {
      base: isSet(object.base) ? Coin.fromJSON(object.base) : undefined,
      quote: isSet(object.quote) ? Coin.fromJSON(object.quote) : undefined,
    };
  },

  toJSON(message: MsgRemoveLiquidityResponse): unknown {
    const obj: any = {};
    if (message.base !== undefined) {
      obj.base = Coin.toJSON(message.base);
    }
    if (message.quote !== undefined) {
      obj.quote = Coin.toJSON(message.quote);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveLiquidityResponse>, I>>(base?: I): MsgRemoveLiquidityResponse {
    return MsgRemoveLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveLiquidityResponse>, I>>(object: I): MsgRemoveLiquidityResponse {
    const message = createBaseMsgRemoveLiquidityResponse();
    message.base = (object.base !== undefined && object.base !== null) ? Coin.fromPartial(object.base) : undefined;
    message.quote = (object.quote !== undefined && object.quote !== null) ? Coin.fromPartial(object.quote) : undefined;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** CreatePool create new pool from base and quote tokens */
  CreatePool(request: MsgCreatePool): Promise<MsgCreatePoolResponse>;
  /** Swap swaps tokens from one to another */
  Swap(request: MsgSwap): Promise<MsgSwapResponse>;
  /** AddLiquidity adds liquidity to the pool, from the base and quote tokens send in */
  AddLiquidity(request: MsgAddLiquidity): Promise<MsgAddLiquidityResponse>;
  /** RemoveLiquidity removes liquidity from the pool, from the lptoken send in */
  RemoveLiquidity(request: MsgRemoveLiquidity): Promise<MsgRemoveLiquidityResponse>;
}

export const MsgServiceName = "zigchain.dex.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.CreatePool = this.CreatePool.bind(this);
    this.Swap = this.Swap.bind(this);
    this.AddLiquidity = this.AddLiquidity.bind(this);
    this.RemoveLiquidity = this.RemoveLiquidity.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  CreatePool(request: MsgCreatePool): Promise<MsgCreatePoolResponse> {
    const data = MsgCreatePool.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreatePool", data);
    return promise.then((data) => MsgCreatePoolResponse.decode(_m0.Reader.create(data)));
  }

  Swap(request: MsgSwap): Promise<MsgSwapResponse> {
    const data = MsgSwap.encode(request).finish();
    const promise = this.rpc.request(this.service, "Swap", data);
    return promise.then((data) => MsgSwapResponse.decode(_m0.Reader.create(data)));
  }

  AddLiquidity(request: MsgAddLiquidity): Promise<MsgAddLiquidityResponse> {
    const data = MsgAddLiquidity.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddLiquidity", data);
    return promise.then((data) => MsgAddLiquidityResponse.decode(_m0.Reader.create(data)));
  }

  RemoveLiquidity(request: MsgRemoveLiquidity): Promise<MsgRemoveLiquidityResponse> {
    const data = MsgRemoveLiquidity.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveLiquidity", data);
    return promise.then((data) => MsgRemoveLiquidityResponse.decode(_m0.Reader.create(data)));
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
