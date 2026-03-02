/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Params } from "./params";
import { Pool } from "./pool";
import { PoolUids } from "./pool_uids";
import { PoolsMeta } from "./pools_meta";

export const protobufPackage = "zigchain.dex";

/** GenesisState defines the dex module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params | undefined;
  portId: string;
  poolList: Pool[];
  poolsMeta: PoolsMeta | undefined;
  poolUidsList: PoolUids[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, portId: "", poolList: [], poolsMeta: undefined, poolUidsList: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    for (const v of message.poolList) {
      Pool.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.poolsMeta !== undefined) {
      PoolsMeta.encode(message.poolsMeta, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.poolUidsList) {
      PoolUids.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolList.push(Pool.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.poolsMeta = PoolsMeta.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.poolUidsList.push(PoolUids.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      portId: isSet(object.portId) ? String(object.portId) : "",
      poolList: Array.isArray(object?.poolList) ? object.poolList.map((e: any) => Pool.fromJSON(e)) : [],
      poolsMeta: isSet(object.poolsMeta) ? PoolsMeta.fromJSON(object.poolsMeta) : undefined,
      poolUidsList: Array.isArray(object?.poolUidsList)
        ? object.poolUidsList.map((e: any) => PoolUids.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.poolList?.length) {
      obj.poolList = message.poolList.map((e) => Pool.toJSON(e));
    }
    if (message.poolsMeta !== undefined) {
      obj.poolsMeta = PoolsMeta.toJSON(message.poolsMeta);
    }
    if (message.poolUidsList?.length) {
      obj.poolUidsList = message.poolUidsList.map((e) => PoolUids.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.portId = object.portId ?? "";
    message.poolList = object.poolList?.map((e) => Pool.fromPartial(e)) || [];
    message.poolsMeta = (object.poolsMeta !== undefined && object.poolsMeta !== null)
      ? PoolsMeta.fromPartial(object.poolsMeta)
      : undefined;
    message.poolUidsList = object.poolUidsList?.map((e) => PoolUids.fromPartial(e)) || [];
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
