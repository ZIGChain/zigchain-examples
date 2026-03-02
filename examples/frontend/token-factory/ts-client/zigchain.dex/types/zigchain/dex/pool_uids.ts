/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigchain.dex";

/** PoolUids is secondary index on pools, allows for reverse lookup from pool date to pool id */
export interface PoolUids {
  poolUid: string;
  poolId: string;
}

function createBasePoolUids(): PoolUids {
  return { poolUid: "", poolId: "" };
}

export const PoolUids = {
  encode(message: PoolUids, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolUid !== "") {
      writer.uint32(10).string(message.poolUid);
    }
    if (message.poolId !== "") {
      writer.uint32(18).string(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolUids {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolUids();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolUid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): PoolUids {
    return {
      poolUid: isSet(object.poolUid) ? String(object.poolUid) : "",
      poolId: isSet(object.poolId) ? String(object.poolId) : "",
    };
  },

  toJSON(message: PoolUids): unknown {
    const obj: any = {};
    if (message.poolUid !== "") {
      obj.poolUid = message.poolUid;
    }
    if (message.poolId !== "") {
      obj.poolId = message.poolId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolUids>, I>>(base?: I): PoolUids {
    return PoolUids.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolUids>, I>>(object: I): PoolUids {
    const message = createBasePoolUids();
    message.poolUid = object.poolUid ?? "";
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
