/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigchain.factory";

/** DenomAuth is a struct that contains the bank and metadata admin of a denom */
export interface DenomAuth {
  denom: string;
  bankAdmin: string;
  metadataAdmin: string;
}

function createBaseDenomAuth(): DenomAuth {
  return { denom: "", bankAdmin: "", metadataAdmin: "" };
}

export const DenomAuth = {
  encode(message: DenomAuth, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.bankAdmin !== "") {
      writer.uint32(18).string(message.bankAdmin);
    }
    if (message.metadataAdmin !== "") {
      writer.uint32(26).string(message.metadataAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomAuth {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomAuth();
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
          if (tag !== 18) {
            break;
          }

          message.bankAdmin = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): DenomAuth {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      bankAdmin: isSet(object.bankAdmin) ? String(object.bankAdmin) : "",
      metadataAdmin: isSet(object.metadataAdmin) ? String(object.metadataAdmin) : "",
    };
  },

  toJSON(message: DenomAuth): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.bankAdmin !== "") {
      obj.bankAdmin = message.bankAdmin;
    }
    if (message.metadataAdmin !== "") {
      obj.metadataAdmin = message.metadataAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DenomAuth>, I>>(base?: I): DenomAuth {
    return DenomAuth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DenomAuth>, I>>(object: I): DenomAuth {
    const message = createBaseDenomAuth();
    message.denom = object.denom ?? "";
    message.bankAdmin = object.bankAdmin ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
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
