/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Params } from "./params";

export const protobufPackage = "zigchain.factory";

/** this file defines the Msg service (transactions)  for the factory module */

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
export interface MsgUpdateParamsResponse {}

/** MsgCreateDenom used to create new denom via factory */
export interface MsgCreateDenom {
  creator: string;
  subDenom: string;
  maxSupply: string; // Expect string type to match chain expectations
  canChangeMaxSupply: boolean;
  /** metadata */
  URI: string;
  /** sha256 hash of the JSON metadata file */
  URIHash: string;
}

/** MsgCreateDenomResponse is conformation on created denom. */
export interface MsgCreateDenomResponse {
  creator: string;
  bankAdmin: string;
  metadataAdmin: string;
  denom: string;
  maxSupply: number;
  canChangeMaxSupply: boolean;
  URI: string;
  URIHash: string;
}

/** MsgMintAndSendTokens mints tokens and sends them to a recipient */
export interface MsgMintAndSendTokens {
  signer: string;
  token: Coin | undefined;
  recipient: string;
}

/** MsgMintAndSendTokensResponse is conformation on minted and sent tokens. */
export interface MsgMintAndSendTokensResponse {
  tokenMinted: Coin | undefined;
  recipient: string;
  newSupply: Coin | undefined;
}

/** MsgUpdateDenomAuth updates the admins address: bank, and metadata of a denom */
export interface MsgUpdateDenomAuth {
  signer: string;
  denom: string;
  bankAdmin: string;
  metadataAdmin: string;
}

/** MsgUpdateDenomAuthResponse is conformation on updated metadata. */
export interface MsgUpdateDenomAuthResponse {
  denom: string;
  bankAdmin: string;
  metadataAdmin: string;
}

/** MsgUpdateDenomURI updates the URI of a denom and its sha256 hash */
export interface MsgUpdateDenomURI {
  signer: string;
  denom: string;
  URI: string;
  URIHash: string;
}

/** MsgUpdateDenomURIResponse is conformation on updated metadata. */
export interface MsgUpdateDenomURIResponse {
  denom: string;
  URI: string;
  URIHash: string;
}

/** MsgUpdateDenomMaxSupply updates the max supply and options o lock max supply changes on a denom */
export interface MsgUpdateDenomMaxSupply {
  signer: string;
  denom: string;
  maxSupply: number;
  canChangeMaxSupply: boolean;
}

/** MsgUpdateDenomMaxSupplyResponse is conformation on updated metadata. */
export interface MsgUpdateDenomMaxSupplyResponse {
  denom: string;
  maxSupply: number;
  canChangeMaxSupply: boolean;
}

/** MsgUpdateDenomMetadataAuth updates the metadata admin of a denom, needed for case when bank admin is disabled */
export interface MsgUpdateDenomMetadataAuth {
  signer: string;
  denom: string;
  metadataAdmin: string;
}

/** MsgUpdateDenomMetadataAuthResponse is conformation on updated metadata. */
export interface MsgUpdateDenomMetadataAuthResponse {
  denom: string;
  metadataAdmin: string;
}

/** MsgBurnTokens burns tokens from the signer's account, signer has to be bank admin to do it. */
export interface MsgBurnTokens {
  signer: string;
  token: Coin | undefined;
}

/** MsgBurnTokensResponse is conformation on burned tokens. */
export interface MsgBurnTokensResponse {
  amountBurned: Coin | undefined;
}

/**
 * REPLACE_TS_CLIENT_FIX_FROM_BODY
 * MsgSetDenomMetadata sets the metadata of a token
 */
export interface MsgSetDenomMetadata {
  signer: string;
  metadata: Metadata | undefined;
}

/** MsgSetDenomMetadataResponse is conformation on updated metadata. */
export interface MsgSetDenomMetadataResponse {
  metadata: Metadata | undefined;
}

/**
 * uncomment me for ts-client, until better solution is found
 * DenomUnit represents a struct that describes a given
 * denomination unit of the basic token.
 */
export interface DenomUnit {
  /** denom represents the string name of the given denom unit (e.g uatom). */
  denom: string;
  /**
   * exponent represents power of 10 exponent that one must
   * raise the base_denom to in order to equal the given DenomUnit's denom
   * 1 denom = 10^exponent base_denom
   * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
   * exponent = 6, thus: 1 atom = 10^6 uatom).
   */
  exponent: number;
  /** aliases is a list of string aliases for the given denom */
  aliases: string[];
}

/**
 * Metadata represents a struct that describes
 * a basic token.
 */
export interface Metadata {
  description: string;
  /** denom_units represents the list of DenomUnit's for a given coin */
  denomUnits: DenomUnit[];
  /** base represents the base denom (should be the DenomUnit with exponent = 0). */
  base: string;
  /**
   * display indicates the suggested denom that should be
   * displayed in clients.
   */
  display: string;
  /**
   * name defines the name of the token (eg: Cosmos Atom)
   *
   * Since: cosmos-sdk 0.43
   */
  name: string;
  /**
   * symbol is the token symbol usually shown on exchanges (eg: ATOM). This can
   * be the same as the display.
   *
   * Since: cosmos-sdk 0.43
   */
  symbol: string;
  /**
   * URI to a document (on or off-chain) that contains additional information. Optional.
   *
   * Since: cosmos-sdk 0.46
   */
  uri: string;
  /**
   * URIHash is a sha256 hash of a document pointed by URI. It's used to verify that
   * the document didn't change. Optional.
   *
   * Since: cosmos-sdk 0.46
   */
  uriHash: string;
}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(
    base?: I
  ): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(
    object: I
  ): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(
    _: MsgUpdateParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateParamsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(
    base?: I
  ): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(
    _: I
  ): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgCreateDenom(): MsgCreateDenom {
  return {
    creator: "",
    subDenom: "",
    maxSupply: "0",
    canChangeMaxSupply: false,
    URI: "",
    URIHash: "",
  };
}

export const MsgCreateDenom = {
  encode(
    message: MsgCreateDenom,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.subDenom !== "") {
      writer.uint32(18).string(message.subDenom);
    }
    if (message.maxSupply !== "0") {
      // Encode maxSupply as bytes (string) to match chain expectations
      writer.uint32(26).string(message.maxSupply); // Use field 3 with string wire type (26 = 3 << 3 | 2)
    }
    if (message.canChangeMaxSupply === true) {
      writer.uint32(32).bool(message.canChangeMaxSupply);
    }
    if (message.URI !== "") {
      writer.uint32(42).string(message.URI);
    }
    if (message.URIHash !== "") {
      writer.uint32(50).string(message.URIHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDenom {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenom();
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

          message.subDenom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            // Changed from 24 to 26 for string wire type
            break;
          }

          message.maxSupply = reader.string();
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

          message.URI = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.URIHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDenom {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      subDenom: isSet(object.subDenom) ? String(object.subDenom) : "",
      maxSupply: isSet(object.maxSupply) ? String(object.maxSupply) : "0",
      canChangeMaxSupply: isSet(object.canChangeMaxSupply)
        ? Boolean(object.canChangeMaxSupply)
        : false,
      URI: isSet(object.URI) ? String(object.URI) : "",
      URIHash: isSet(object.URIHash) ? String(object.URIHash) : "",
    };
  },

  toJSON(message: MsgCreateDenom): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.subDenom !== "") {
      obj.subDenom = message.subDenom;
    }
    if (message.maxSupply !== "0") {
      obj.maxSupply = message.maxSupply;
    }
    if (message.canChangeMaxSupply === true) {
      obj.canChangeMaxSupply = message.canChangeMaxSupply;
    }
    if (message.URI !== "") {
      obj.URI = message.URI;
    }
    if (message.URIHash !== "") {
      obj.URIHash = message.URIHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDenom>, I>>(
    base?: I
  ): MsgCreateDenom {
    return MsgCreateDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDenom>, I>>(
    object: I
  ): MsgCreateDenom {
    const message = createBaseMsgCreateDenom();
    message.creator = object.creator ?? "";
    message.subDenom = object.subDenom ?? "";
    message.maxSupply = object.maxSupply ?? "0";
    message.canChangeMaxSupply = object.canChangeMaxSupply ?? false;
    message.URI = object.URI ?? "";
    message.URIHash = object.URIHash ?? "";
    return message;
  },
};

function createBaseMsgCreateDenomResponse(): MsgCreateDenomResponse {
  return {
    creator: "",
    bankAdmin: "",
    metadataAdmin: "",
    denom: "",
    maxSupply: 0,
    canChangeMaxSupply: false,
    URI: "",
    URIHash: "",
  };
}

export const MsgCreateDenomResponse = {
  encode(
    message: MsgCreateDenomResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bankAdmin !== "") {
      writer.uint32(18).string(message.bankAdmin);
    }
    if (message.metadataAdmin !== "") {
      writer.uint32(26).string(message.metadataAdmin);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    if (message.maxSupply !== 0) {
      writer.uint32(40).int64(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      writer.uint32(48).bool(message.canChangeMaxSupply);
    }
    if (message.URI !== "") {
      writer.uint32(58).string(message.URI);
    }
    if (message.URIHash !== "") {
      writer.uint32(66).string(message.URIHash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateDenomResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenomResponse();
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

          message.bankAdmin = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadataAdmin = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxSupply = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.canChangeMaxSupply = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.URI = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.URIHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDenomResponse {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bankAdmin: isSet(object.bankAdmin) ? String(object.bankAdmin) : "",
      metadataAdmin: isSet(object.metadataAdmin)
        ? String(object.metadataAdmin)
        : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      maxSupply: isSet(object.maxSupply) ? Number(object.maxSupply) : 0,
      canChangeMaxSupply: isSet(object.canChangeMaxSupply)
        ? Boolean(object.canChangeMaxSupply)
        : false,
      URI: isSet(object.URI) ? String(object.URI) : "",
      URIHash: isSet(object.URIHash) ? String(object.URIHash) : "",
    };
  },

  toJSON(message: MsgCreateDenomResponse): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.bankAdmin !== "") {
      obj.bankAdmin = message.bankAdmin;
    }
    if (message.metadataAdmin !== "") {
      obj.metadataAdmin = message.metadataAdmin;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.maxSupply !== 0) {
      obj.maxSupply = Math.round(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      obj.canChangeMaxSupply = message.canChangeMaxSupply;
    }
    if (message.URI !== "") {
      obj.URI = message.URI;
    }
    if (message.URIHash !== "") {
      obj.URIHash = message.URIHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDenomResponse>, I>>(
    base?: I
  ): MsgCreateDenomResponse {
    return MsgCreateDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDenomResponse>, I>>(
    object: I
  ): MsgCreateDenomResponse {
    const message = createBaseMsgCreateDenomResponse();
    message.creator = object.creator ?? "";
    message.bankAdmin = object.bankAdmin ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
    message.denom = object.denom ?? "";
    message.maxSupply = object.maxSupply ?? 0;
    message.canChangeMaxSupply = object.canChangeMaxSupply ?? false;
    message.URI = object.URI ?? "";
    message.URIHash = object.URIHash ?? "";
    return message;
  },
};

function createBaseMsgMintAndSendTokens(): MsgMintAndSendTokens {
  return { signer: "", token: undefined, recipient: "" };
}

export const MsgMintAndSendTokens = {
  encode(
    message: MsgMintAndSendTokens,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.token !== undefined) {
      Coin.encode(message.token, writer.uint32(18).fork()).ldelim();
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgMintAndSendTokens {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintAndSendTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.token = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.recipient = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMintAndSendTokens {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      token: isSet(object.token) ? Coin.fromJSON(object.token) : undefined,
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
    };
  },

  toJSON(message: MsgMintAndSendTokens): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.token !== undefined) {
      obj.token = Coin.toJSON(message.token);
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintAndSendTokens>, I>>(
    base?: I
  ): MsgMintAndSendTokens {
    return MsgMintAndSendTokens.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintAndSendTokens>, I>>(
    object: I
  ): MsgMintAndSendTokens {
    const message = createBaseMsgMintAndSendTokens();
    message.signer = object.signer ?? "";
    message.token =
      object.token !== undefined && object.token !== null
        ? Coin.fromPartial(object.token)
        : undefined;
    message.recipient = object.recipient ?? "";
    return message;
  },
};

function createBaseMsgMintAndSendTokensResponse(): MsgMintAndSendTokensResponse {
  return { tokenMinted: undefined, recipient: "", newSupply: undefined };
}

export const MsgMintAndSendTokensResponse = {
  encode(
    message: MsgMintAndSendTokensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tokenMinted !== undefined) {
      Coin.encode(message.tokenMinted, writer.uint32(10).fork()).ldelim();
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    if (message.newSupply !== undefined) {
      Coin.encode(message.newSupply, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgMintAndSendTokensResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintAndSendTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenMinted = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newSupply = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMintAndSendTokensResponse {
    return {
      tokenMinted: isSet(object.tokenMinted)
        ? Coin.fromJSON(object.tokenMinted)
        : undefined,
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      newSupply: isSet(object.newSupply)
        ? Coin.fromJSON(object.newSupply)
        : undefined,
    };
  },

  toJSON(message: MsgMintAndSendTokensResponse): unknown {
    const obj: any = {};
    if (message.tokenMinted !== undefined) {
      obj.tokenMinted = Coin.toJSON(message.tokenMinted);
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.newSupply !== undefined) {
      obj.newSupply = Coin.toJSON(message.newSupply);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintAndSendTokensResponse>, I>>(
    base?: I
  ): MsgMintAndSendTokensResponse {
    return MsgMintAndSendTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintAndSendTokensResponse>, I>>(
    object: I
  ): MsgMintAndSendTokensResponse {
    const message = createBaseMsgMintAndSendTokensResponse();
    message.tokenMinted =
      object.tokenMinted !== undefined && object.tokenMinted !== null
        ? Coin.fromPartial(object.tokenMinted)
        : undefined;
    message.recipient = object.recipient ?? "";
    message.newSupply =
      object.newSupply !== undefined && object.newSupply !== null
        ? Coin.fromPartial(object.newSupply)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateDenomAuth(): MsgUpdateDenomAuth {
  return { signer: "", denom: "", bankAdmin: "", metadataAdmin: "" };
}

export const MsgUpdateDenomAuth = {
  encode(
    message: MsgUpdateDenomAuth,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.bankAdmin !== "") {
      writer.uint32(26).string(message.bankAdmin);
    }
    if (message.metadataAdmin !== "") {
      writer.uint32(34).string(message.metadataAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDenomAuth {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomAuth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bankAdmin = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): MsgUpdateDenomAuth {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      bankAdmin: isSet(object.bankAdmin) ? String(object.bankAdmin) : "",
      metadataAdmin: isSet(object.metadataAdmin)
        ? String(object.metadataAdmin)
        : "",
    };
  },

  toJSON(message: MsgUpdateDenomAuth): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
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

  create<I extends Exact<DeepPartial<MsgUpdateDenomAuth>, I>>(
    base?: I
  ): MsgUpdateDenomAuth {
    return MsgUpdateDenomAuth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomAuth>, I>>(
    object: I
  ): MsgUpdateDenomAuth {
    const message = createBaseMsgUpdateDenomAuth();
    message.signer = object.signer ?? "";
    message.denom = object.denom ?? "";
    message.bankAdmin = object.bankAdmin ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
    return message;
  },
};

function createBaseMsgUpdateDenomAuthResponse(): MsgUpdateDenomAuthResponse {
  return { denom: "", bankAdmin: "", metadataAdmin: "" };
}

export const MsgUpdateDenomAuthResponse = {
  encode(
    message: MsgUpdateDenomAuthResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDenomAuthResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomAuthResponse();
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

  fromJSON(object: any): MsgUpdateDenomAuthResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      bankAdmin: isSet(object.bankAdmin) ? String(object.bankAdmin) : "",
      metadataAdmin: isSet(object.metadataAdmin)
        ? String(object.metadataAdmin)
        : "",
    };
  },

  toJSON(message: MsgUpdateDenomAuthResponse): unknown {
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

  create<I extends Exact<DeepPartial<MsgUpdateDenomAuthResponse>, I>>(
    base?: I
  ): MsgUpdateDenomAuthResponse {
    return MsgUpdateDenomAuthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomAuthResponse>, I>>(
    object: I
  ): MsgUpdateDenomAuthResponse {
    const message = createBaseMsgUpdateDenomAuthResponse();
    message.denom = object.denom ?? "";
    message.bankAdmin = object.bankAdmin ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
    return message;
  },
};

function createBaseMsgUpdateDenomURI(): MsgUpdateDenomURI {
  return { signer: "", denom: "", URI: "", URIHash: "" };
}

export const MsgUpdateDenomURI = {
  encode(
    message: MsgUpdateDenomURI,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.URI !== "") {
      writer.uint32(26).string(message.URI);
    }
    if (message.URIHash !== "") {
      writer.uint32(34).string(message.URIHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDenomURI {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomURI();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.URI = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.URIHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDenomURI {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      URI: isSet(object.URI) ? String(object.URI) : "",
      URIHash: isSet(object.URIHash) ? String(object.URIHash) : "",
    };
  },

  toJSON(message: MsgUpdateDenomURI): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.URI !== "") {
      obj.URI = message.URI;
    }
    if (message.URIHash !== "") {
      obj.URIHash = message.URIHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomURI>, I>>(
    base?: I
  ): MsgUpdateDenomURI {
    return MsgUpdateDenomURI.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomURI>, I>>(
    object: I
  ): MsgUpdateDenomURI {
    const message = createBaseMsgUpdateDenomURI();
    message.signer = object.signer ?? "";
    message.denom = object.denom ?? "";
    message.URI = object.URI ?? "";
    message.URIHash = object.URIHash ?? "";
    return message;
  },
};

function createBaseMsgUpdateDenomURIResponse(): MsgUpdateDenomURIResponse {
  return { denom: "", URI: "", URIHash: "" };
}

export const MsgUpdateDenomURIResponse = {
  encode(
    message: MsgUpdateDenomURIResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.URI !== "") {
      writer.uint32(18).string(message.URI);
    }
    if (message.URIHash !== "") {
      writer.uint32(26).string(message.URIHash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDenomURIResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomURIResponse();
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

          message.URI = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.URIHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDenomURIResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      URI: isSet(object.URI) ? String(object.URI) : "",
      URIHash: isSet(object.URIHash) ? String(object.URIHash) : "",
    };
  },

  toJSON(message: MsgUpdateDenomURIResponse): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.URI !== "") {
      obj.URI = message.URI;
    }
    if (message.URIHash !== "") {
      obj.URIHash = message.URIHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomURIResponse>, I>>(
    base?: I
  ): MsgUpdateDenomURIResponse {
    return MsgUpdateDenomURIResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomURIResponse>, I>>(
    object: I
  ): MsgUpdateDenomURIResponse {
    const message = createBaseMsgUpdateDenomURIResponse();
    message.denom = object.denom ?? "";
    message.URI = object.URI ?? "";
    message.URIHash = object.URIHash ?? "";
    return message;
  },
};

function createBaseMsgUpdateDenomMaxSupply(): MsgUpdateDenomMaxSupply {
  return { signer: "", denom: "", maxSupply: 0, canChangeMaxSupply: false };
}

export const MsgUpdateDenomMaxSupply = {
  encode(
    message: MsgUpdateDenomMaxSupply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.maxSupply !== 0) {
      writer.uint32(24).int64(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      writer.uint32(32).bool(message.canChangeMaxSupply);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDenomMaxSupply {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomMaxSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDenomMaxSupply {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      maxSupply: isSet(object.maxSupply) ? Number(object.maxSupply) : 0,
      canChangeMaxSupply: isSet(object.canChangeMaxSupply)
        ? Boolean(object.canChangeMaxSupply)
        : false,
    };
  },

  toJSON(message: MsgUpdateDenomMaxSupply): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.maxSupply !== 0) {
      obj.maxSupply = Math.round(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      obj.canChangeMaxSupply = message.canChangeMaxSupply;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomMaxSupply>, I>>(
    base?: I
  ): MsgUpdateDenomMaxSupply {
    return MsgUpdateDenomMaxSupply.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomMaxSupply>, I>>(
    object: I
  ): MsgUpdateDenomMaxSupply {
    const message = createBaseMsgUpdateDenomMaxSupply();
    message.signer = object.signer ?? "";
    message.denom = object.denom ?? "";
    message.maxSupply = object.maxSupply ?? 0;
    message.canChangeMaxSupply = object.canChangeMaxSupply ?? false;
    return message;
  },
};

function createBaseMsgUpdateDenomMaxSupplyResponse(): MsgUpdateDenomMaxSupplyResponse {
  return { denom: "", maxSupply: 0, canChangeMaxSupply: false };
}

export const MsgUpdateDenomMaxSupplyResponse = {
  encode(
    message: MsgUpdateDenomMaxSupplyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.maxSupply !== 0) {
      writer.uint32(16).int64(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      writer.uint32(24).bool(message.canChangeMaxSupply);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDenomMaxSupplyResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomMaxSupplyResponse();
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

          message.maxSupply = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.canChangeMaxSupply = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDenomMaxSupplyResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      maxSupply: isSet(object.maxSupply) ? Number(object.maxSupply) : 0,
      canChangeMaxSupply: isSet(object.canChangeMaxSupply)
        ? Boolean(object.canChangeMaxSupply)
        : false,
    };
  },

  toJSON(message: MsgUpdateDenomMaxSupplyResponse): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.maxSupply !== 0) {
      obj.maxSupply = Math.round(message.maxSupply);
    }
    if (message.canChangeMaxSupply === true) {
      obj.canChangeMaxSupply = message.canChangeMaxSupply;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomMaxSupplyResponse>, I>>(
    base?: I
  ): MsgUpdateDenomMaxSupplyResponse {
    return MsgUpdateDenomMaxSupplyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomMaxSupplyResponse>, I>>(
    object: I
  ): MsgUpdateDenomMaxSupplyResponse {
    const message = createBaseMsgUpdateDenomMaxSupplyResponse();
    message.denom = object.denom ?? "";
    message.maxSupply = object.maxSupply ?? 0;
    message.canChangeMaxSupply = object.canChangeMaxSupply ?? false;
    return message;
  },
};

function createBaseMsgUpdateDenomMetadataAuth(): MsgUpdateDenomMetadataAuth {
  return { signer: "", denom: "", metadataAdmin: "" };
}

export const MsgUpdateDenomMetadataAuth = {
  encode(
    message: MsgUpdateDenomMetadataAuth,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.metadataAdmin !== "") {
      writer.uint32(26).string(message.metadataAdmin);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDenomMetadataAuth {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomMetadataAuth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
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

  fromJSON(object: any): MsgUpdateDenomMetadataAuth {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      metadataAdmin: isSet(object.metadataAdmin)
        ? String(object.metadataAdmin)
        : "",
    };
  },

  toJSON(message: MsgUpdateDenomMetadataAuth): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.metadataAdmin !== "") {
      obj.metadataAdmin = message.metadataAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomMetadataAuth>, I>>(
    base?: I
  ): MsgUpdateDenomMetadataAuth {
    return MsgUpdateDenomMetadataAuth.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomMetadataAuth>, I>>(
    object: I
  ): MsgUpdateDenomMetadataAuth {
    const message = createBaseMsgUpdateDenomMetadataAuth();
    message.signer = object.signer ?? "";
    message.denom = object.denom ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
    return message;
  },
};

function createBaseMsgUpdateDenomMetadataAuthResponse(): MsgUpdateDenomMetadataAuthResponse {
  return { denom: "", metadataAdmin: "" };
}

export const MsgUpdateDenomMetadataAuthResponse = {
  encode(
    message: MsgUpdateDenomMetadataAuthResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.metadataAdmin !== "") {
      writer.uint32(18).string(message.metadataAdmin);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDenomMetadataAuthResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomMetadataAuthResponse();
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

  fromJSON(object: any): MsgUpdateDenomMetadataAuthResponse {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      metadataAdmin: isSet(object.metadataAdmin)
        ? String(object.metadataAdmin)
        : "",
    };
  },

  toJSON(message: MsgUpdateDenomMetadataAuthResponse): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.metadataAdmin !== "") {
      obj.metadataAdmin = message.metadataAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomMetadataAuthResponse>, I>>(
    base?: I
  ): MsgUpdateDenomMetadataAuthResponse {
    return MsgUpdateDenomMetadataAuthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<MsgUpdateDenomMetadataAuthResponse>, I>
  >(object: I): MsgUpdateDenomMetadataAuthResponse {
    const message = createBaseMsgUpdateDenomMetadataAuthResponse();
    message.denom = object.denom ?? "";
    message.metadataAdmin = object.metadataAdmin ?? "";
    return message;
  },
};

function createBaseMsgBurnTokens(): MsgBurnTokens {
  return { signer: "", token: undefined };
}

export const MsgBurnTokens = {
  encode(
    message: MsgBurnTokens,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.token !== undefined) {
      Coin.encode(message.token, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnTokens {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.token = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBurnTokens {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      token: isSet(object.token) ? Coin.fromJSON(object.token) : undefined,
    };
  },

  toJSON(message: MsgBurnTokens): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.token !== undefined) {
      obj.token = Coin.toJSON(message.token);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnTokens>, I>>(
    base?: I
  ): MsgBurnTokens {
    return MsgBurnTokens.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnTokens>, I>>(
    object: I
  ): MsgBurnTokens {
    const message = createBaseMsgBurnTokens();
    message.signer = object.signer ?? "";
    message.token =
      object.token !== undefined && object.token !== null
        ? Coin.fromPartial(object.token)
        : undefined;
    return message;
  },
};

function createBaseMsgBurnTokensResponse(): MsgBurnTokensResponse {
  return { amountBurned: undefined };
}

export const MsgBurnTokensResponse = {
  encode(
    message: MsgBurnTokensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amountBurned !== undefined) {
      Coin.encode(message.amountBurned, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgBurnTokensResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amountBurned = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBurnTokensResponse {
    return {
      amountBurned: isSet(object.amountBurned)
        ? Coin.fromJSON(object.amountBurned)
        : undefined,
    };
  },

  toJSON(message: MsgBurnTokensResponse): unknown {
    const obj: any = {};
    if (message.amountBurned !== undefined) {
      obj.amountBurned = Coin.toJSON(message.amountBurned);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnTokensResponse>, I>>(
    base?: I
  ): MsgBurnTokensResponse {
    return MsgBurnTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnTokensResponse>, I>>(
    object: I
  ): MsgBurnTokensResponse {
    const message = createBaseMsgBurnTokensResponse();
    message.amountBurned =
      object.amountBurned !== undefined && object.amountBurned !== null
        ? Coin.fromPartial(object.amountBurned)
        : undefined;
    return message;
  },
};

function createBaseMsgSetDenomMetadata(): MsgSetDenomMetadata {
  return { signer: "", metadata: undefined };
}

export const MsgSetDenomMetadata = {
  encode(
    message: MsgSetDenomMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDenomMetadata {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDenomMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetDenomMetadata {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: MsgSetDenomMetadata): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDenomMetadata>, I>>(
    base?: I
  ): MsgSetDenomMetadata {
    return MsgSetDenomMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDenomMetadata>, I>>(
    object: I
  ): MsgSetDenomMetadata {
    const message = createBaseMsgSetDenomMetadata();
    message.signer = object.signer ?? "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseMsgSetDenomMetadataResponse(): MsgSetDenomMetadataResponse {
  return { metadata: undefined };
}

export const MsgSetDenomMetadataResponse = {
  encode(
    message: MsgSetDenomMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetDenomMetadataResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDenomMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetDenomMetadataResponse {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: MsgSetDenomMetadataResponse): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDenomMetadataResponse>, I>>(
    base?: I
  ): MsgSetDenomMetadataResponse {
    return MsgSetDenomMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDenomMetadataResponse>, I>>(
    object: I
  ): MsgSetDenomMetadataResponse {
    const message = createBaseMsgSetDenomMetadataResponse();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseDenomUnit(): DenomUnit {
  return { denom: "", exponent: 0, aliases: [] };
}

export const DenomUnit = {
  encode(
    message: DenomUnit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.exponent !== 0) {
      writer.uint32(16).uint32(message.exponent);
    }
    for (const v of message.aliases) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomUnit {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomUnit();
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

          message.exponent = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.aliases.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DenomUnit {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      exponent: isSet(object.exponent) ? Number(object.exponent) : 0,
      aliases: Array.isArray(object?.aliases)
        ? object.aliases.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: DenomUnit): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.exponent !== 0) {
      obj.exponent = Math.round(message.exponent);
    }
    if (message.aliases?.length) {
      obj.aliases = message.aliases;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DenomUnit>, I>>(base?: I): DenomUnit {
    return DenomUnit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DenomUnit>, I>>(
    object: I
  ): DenomUnit {
    const message = createBaseDenomUnit();
    message.denom = object.denom ?? "";
    message.exponent = object.exponent ?? 0;
    message.aliases = object.aliases?.map((e) => e) || [];
    return message;
  },
};

function createBaseMetadata(): Metadata {
  return {
    description: "",
    denomUnits: [],
    base: "",
    display: "",
    name: "",
    symbol: "",
    uri: "",
    uriHash: "",
  };
}

export const Metadata = {
  encode(
    message: Metadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    for (const v of message.denomUnits) {
      DenomUnit.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.base !== "") {
      writer.uint32(26).string(message.base);
    }
    if (message.display !== "") {
      writer.uint32(34).string(message.display);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(50).string(message.symbol);
    }
    if (message.uri !== "") {
      writer.uint32(58).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(66).string(message.uriHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denomUnits.push(DenomUnit.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.base = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.display = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.uriHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      description: isSet(object.description) ? String(object.description) : "",
      denomUnits: Array.isArray(object?.denomUnits)
        ? object.denomUnits.map((e: any) => DenomUnit.fromJSON(e))
        : [],
      base: isSet(object.base) ? String(object.base) : "",
      display: isSet(object.display) ? String(object.display) : "",
      name: isSet(object.name) ? String(object.name) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.denomUnits?.length) {
      obj.denomUnits = message.denomUnits.map((e) => DenomUnit.toJSON(e));
    }
    if (message.base !== "") {
      obj.base = message.base;
    }
    if (message.display !== "") {
      obj.display = message.display;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.uriHash !== "") {
      obj.uriHash = message.uriHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Metadata>, I>>(base?: I): Metadata {
    return Metadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.description = object.description ?? "";
    message.denomUnits =
      object.denomUnits?.map((e) => DenomUnit.fromPartial(e)) || [];
    message.base = object.base ?? "";
    message.display = object.display ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
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
  /** Create token */
  CreateDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse>;
  /** Set the metadata of a denom */
  SetDenomMetadata(
    request: MsgSetDenomMetadata
  ): Promise<MsgSetDenomMetadataResponse>;
  /** UpdateDenomURI updates the URI of a denom and its sha256 hash, only bank admin can do it. */
  UpdateDenomURI(
    request: MsgUpdateDenomURI
  ): Promise<MsgUpdateDenomURIResponse>;
  /** UpdateDenomMaxSupply updates the max supply and options o lock max supply changes on a denom, only bank admin can do it. */
  UpdateDenomMaxSupply(
    request: MsgUpdateDenomMaxSupply
  ): Promise<MsgUpdateDenomMaxSupplyResponse>;
  /** UpdateDenomAuth updates the admins address: bank, and metadata of a denom, only bank admin can do it. */
  UpdateDenomAuth(
    request: MsgUpdateDenomAuth
  ): Promise<MsgUpdateDenomAuthResponse>;
  /** UpdateDenomMetadataAuth updates the metadata admin of a denom, needed for case when bank admin is disabled */
  UpdateDenomMetadataAuth(
    request: MsgUpdateDenomMetadataAuth
  ): Promise<MsgUpdateDenomMetadataAuthResponse>;
  /** Mint and send tokens to a recipient */
  MintAndSendTokens(
    request: MsgMintAndSendTokens
  ): Promise<MsgMintAndSendTokensResponse>;
  /** BurnTokens - Burn tokens from the signer's account, signer has to be bank admin to do it. */
  BurnTokens(request: MsgBurnTokens): Promise<MsgBurnTokensResponse>;
}

export const MsgServiceName = "zigchain.factory.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.CreateDenom = this.CreateDenom.bind(this);
    this.SetDenomMetadata = this.SetDenomMetadata.bind(this);
    this.UpdateDenomURI = this.UpdateDenomURI.bind(this);
    this.UpdateDenomMaxSupply = this.UpdateDenomMaxSupply.bind(this);
    this.UpdateDenomAuth = this.UpdateDenomAuth.bind(this);
    this.UpdateDenomMetadataAuth = this.UpdateDenomMetadataAuth.bind(this);
    this.MintAndSendTokens = this.MintAndSendTokens.bind(this);
    this.BurnTokens = this.BurnTokens.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(_m0.Reader.create(data))
    );
  }

  CreateDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse> {
    const data = MsgCreateDenom.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateDenom", data);
    return promise.then((data) =>
      MsgCreateDenomResponse.decode(_m0.Reader.create(data))
    );
  }

  SetDenomMetadata(
    request: MsgSetDenomMetadata
  ): Promise<MsgSetDenomMetadataResponse> {
    const data = MsgSetDenomMetadata.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetDenomMetadata", data);
    return promise.then((data) =>
      MsgSetDenomMetadataResponse.decode(_m0.Reader.create(data))
    );
  }

  UpdateDenomURI(
    request: MsgUpdateDenomURI
  ): Promise<MsgUpdateDenomURIResponse> {
    const data = MsgUpdateDenomURI.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateDenomURI", data);
    return promise.then((data) =>
      MsgUpdateDenomURIResponse.decode(_m0.Reader.create(data))
    );
  }

  UpdateDenomMaxSupply(
    request: MsgUpdateDenomMaxSupply
  ): Promise<MsgUpdateDenomMaxSupplyResponse> {
    const data = MsgUpdateDenomMaxSupply.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "UpdateDenomMaxSupply",
      data
    );
    return promise.then((data) =>
      MsgUpdateDenomMaxSupplyResponse.decode(_m0.Reader.create(data))
    );
  }

  UpdateDenomAuth(
    request: MsgUpdateDenomAuth
  ): Promise<MsgUpdateDenomAuthResponse> {
    const data = MsgUpdateDenomAuth.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateDenomAuth", data);
    return promise.then((data) =>
      MsgUpdateDenomAuthResponse.decode(_m0.Reader.create(data))
    );
  }

  UpdateDenomMetadataAuth(
    request: MsgUpdateDenomMetadataAuth
  ): Promise<MsgUpdateDenomMetadataAuthResponse> {
    const data = MsgUpdateDenomMetadataAuth.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "UpdateDenomMetadataAuth",
      data
    );
    return promise.then((data) =>
      MsgUpdateDenomMetadataAuthResponse.decode(_m0.Reader.create(data))
    );
  }

  MintAndSendTokens(
    request: MsgMintAndSendTokens
  ): Promise<MsgMintAndSendTokensResponse> {
    const data = MsgMintAndSendTokens.encode(request).finish();
    const promise = this.rpc.request(this.service, "MintAndSendTokens", data);
    return promise.then((data) =>
      MsgMintAndSendTokensResponse.decode(_m0.Reader.create(data))
    );
  }

  BurnTokens(request: MsgBurnTokens): Promise<MsgBurnTokensResponse> {
    const data = MsgBurnTokens.encode(request).finish();
    const promise = this.rpc.request(this.service, "BurnTokens", data);
    return promise.then((data) =>
      MsgBurnTokensResponse.decode(_m0.Reader.create(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
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

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error(
      "Value is larger than Number.MAX_SAFE_INTEGER"
    );
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
