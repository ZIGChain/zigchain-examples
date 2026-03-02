/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigchain.dex";

/** PoolMeta is the metadata of a pool related stuff */
export interface PoolsMeta {
  nextPoolId: number;
}

function createBasePoolsMeta(): PoolsMeta {
  return { nextPoolId: 0 };
}

export const PoolsMeta = {
  encode(message: PoolsMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nextPoolId !== 0) {
      writer.uint32(8).uint64(message.nextPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolsMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolsMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nextPoolId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolsMeta {
    return { nextPoolId: isSet(object.nextPoolId) ? Number(object.nextPoolId) : 0 };
  },

  toJSON(message: PoolsMeta): unknown {
    const obj: any = {};
    if (message.nextPoolId !== 0) {
      obj.nextPoolId = Math.round(message.nextPoolId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolsMeta>, I>>(base?: I): PoolsMeta {
    return PoolsMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolsMeta>, I>>(object: I): PoolsMeta {
    const message = createBasePoolsMeta();
    message.nextPoolId = object.nextPoolId ?? 0;
    return message;
  },
};

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
