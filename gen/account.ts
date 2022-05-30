/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { AffectedRows } from "./common";

export const protobufPackage = "account";

export interface UID {
  UID: string;
}

export interface Account {
  ID: number;
  UID: string;
  Name: string;
  Bio?: string | undefined;
}

export interface CreateAccountInput {
  UID: string;
  Name: string;
  Bio?: string | undefined;
}

function createBaseUID(): UID {
  return { UID: "" };
}

export const UID = {
  encode(message: UID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UID !== "") {
      writer.uint32(10).string(message.UID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UID {
    return {
      UID: isSet(object.UID) ? String(object.UID) : "",
    };
  },

  toJSON(message: UID): unknown {
    const obj: any = {};
    message.UID !== undefined && (obj.UID = message.UID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UID>, I>>(object: I): UID {
    const message = createBaseUID();
    message.UID = object.UID ?? "";
    return message;
  },
};

function createBaseAccount(): Account {
  return { ID: 0, UID: "", Name: "", Bio: undefined };
}

export const Account = {
  encode(
    message: Account,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ID !== 0) {
      writer.uint32(8).int64(message.ID);
    }
    if (message.UID !== "") {
      writer.uint32(18).string(message.UID);
    }
    if (message.Name !== "") {
      writer.uint32(26).string(message.Name);
    }
    if (message.Bio !== undefined) {
      writer.uint32(34).string(message.Bio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ID = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.UID = reader.string();
          break;
        case 3:
          message.Name = reader.string();
          break;
        case 4:
          message.Bio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      ID: isSet(object.ID) ? Number(object.ID) : 0,
      UID: isSet(object.UID) ? String(object.UID) : "",
      Name: isSet(object.Name) ? String(object.Name) : "",
      Bio: isSet(object.Bio) ? String(object.Bio) : undefined,
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    message.ID !== undefined && (obj.ID = Math.round(message.ID));
    message.UID !== undefined && (obj.UID = message.UID);
    message.Name !== undefined && (obj.Name = message.Name);
    message.Bio !== undefined && (obj.Bio = message.Bio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
    const message = createBaseAccount();
    message.ID = object.ID ?? 0;
    message.UID = object.UID ?? "";
    message.Name = object.Name ?? "";
    message.Bio = object.Bio ?? undefined;
    return message;
  },
};

function createBaseCreateAccountInput(): CreateAccountInput {
  return { UID: "", Name: "", Bio: undefined };
}

export const CreateAccountInput = {
  encode(
    message: CreateAccountInput,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.UID !== "") {
      writer.uint32(10).string(message.UID);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Bio !== undefined) {
      writer.uint32(26).string(message.Bio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAccountInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateAccountInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UID = reader.string();
          break;
        case 2:
          message.Name = reader.string();
          break;
        case 3:
          message.Bio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateAccountInput {
    return {
      UID: isSet(object.UID) ? String(object.UID) : "",
      Name: isSet(object.Name) ? String(object.Name) : "",
      Bio: isSet(object.Bio) ? String(object.Bio) : undefined,
    };
  },

  toJSON(message: CreateAccountInput): unknown {
    const obj: any = {};
    message.UID !== undefined && (obj.UID = message.UID);
    message.Name !== undefined && (obj.Name = message.Name);
    message.Bio !== undefined && (obj.Bio = message.Bio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateAccountInput>, I>>(
    object: I
  ): CreateAccountInput {
    const message = createBaseCreateAccountInput();
    message.UID = object.UID ?? "";
    message.Name = object.Name ?? "";
    message.Bio = object.Bio ?? undefined;
    return message;
  },
};

export interface AccountService {
  FindOneByUID(request: UID): Promise<Account>;
  CreateAccount(request: CreateAccountInput): Promise<AffectedRows>;
}

export class AccountServiceClientImpl implements AccountService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.FindOneByUID = this.FindOneByUID.bind(this);
    this.CreateAccount = this.CreateAccount.bind(this);
  }
  FindOneByUID(request: UID): Promise<Account> {
    const data = UID.encode(request).finish();
    const promise = this.rpc.request(
      "account.AccountService",
      "FindOneByUID",
      data
    );
    return promise.then((data) => Account.decode(new _m0.Reader(data)));
  }

  CreateAccount(request: CreateAccountInput): Promise<AffectedRows> {
    const data = CreateAccountInput.encode(request).finish();
    const promise = this.rpc.request(
      "account.AccountService",
      "CreateAccount",
      data
    );
    return promise.then((data) => AffectedRows.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
