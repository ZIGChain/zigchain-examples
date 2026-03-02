/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "zigchain.dex";

/** Pool is a struct that contains the poolId, base, quote, lpToken, creator, fee, and formula */
export interface Pool {
  poolId: string;
  /**
   * we allow for list of coins that is auto sorted by denom,
   * but also allowing for more then two coins in pool in future, like tripools
   */
  lpToken: Coin | undefined;
  creator: string;
  /** fee is per 100,000 */
  fee: number;
  formula: string;
  coins: Coin[];
}

/** PoolsPair is a struct that contains the poolId only, used as secondary index into pools */
export interface PoolPair {
  poolId: string;
}

function createBasePool(): Pool {
  return { poolId: "", lpToken: undefined, creator: "", fee: 0, formula: "", coins: [] };
}

export const Pool = {
  encode(message: Pool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.lpToken !== undefined) {
      Coin.encode(message.lpToken, writer.uint32(18).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.fee !== 0) {
      writer.uint32(32).uint32(message.fee);
    }
    if (message.formula !== "") {
      writer.uint32(42).string(message.formula);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
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

          message.lpToken = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.fee = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.formula = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pool {
    return {
      poolId: isSet(object.poolId) ? String(object.poolId) : "",
      lpToken: isSet(object.lpToken) ? Coin.fromJSON(object.lpToken) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      fee: isSet(object.fee) ? Number(object.fee) : 0,
      formula: isSet(object.formula) ? String(object.formula) : "",
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Pool): unknown {
    const obj: any = {};
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    if (message.lpToken !== undefined) {
      obj.lpToken = Coin.toJSON(message.lpToken);
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.fee !== 0) {
      obj.fee = Math.round(message.fee);
    }
    if (message.formula !== "") {
      obj.formula = message.formula;
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pool>, I>>(base?: I): Pool {
    return Pool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pool>, I>>(object: I): Pool {
    const message = createBasePool();
    message.poolId = object.poolId ?? "";
    message.lpToken = (object.lpToken !== undefined && object.lpToken !== null)
      ? Coin.fromPartial(object.lpToken)
      : undefined;
    message.creator = object.creator ?? "";
    message.fee = object.fee ?? 0;
    message.formula = object.formula ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePoolPair(): PoolPair {
  return { poolId: "" };
}

export const PoolPair = {
  encode(message: PoolPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolPair();
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

  fromJSON(object: any): PoolPair {
    return { poolId: isSet(object.poolId) ? String(object.poolId) : "" };
  },

  toJSON(message: PoolPair): unknown {
    const obj: any = {};
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolPair>, I>>(base?: I): PoolPair {
    return PoolPair.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolPair>, I>>(object: I): PoolPair {
    const message = createBasePoolPair();
    message.poolId = object.poolId ?? "";
    return message;
  },
};

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
