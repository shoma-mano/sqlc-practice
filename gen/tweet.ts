/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { CreateCategoryInput } from "./category";
import { AffectedRows } from "./common";

export const protobufPackage = "tweet";

export interface CreateTweetInput {
  Content: string;
  AccountID: number;
  Categories: CreateCategoryInput[];
}

function createBaseCreateTweetInput(): CreateTweetInput {
  return { Content: "", AccountID: 0, Categories: [] };
}

export const CreateTweetInput = {
  encode(
    message: CreateTweetInput,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Content !== "") {
      writer.uint32(10).string(message.Content);
    }
    if (message.AccountID !== 0) {
      writer.uint32(16).int64(message.AccountID);
    }
    for (const v of message.Categories) {
      CreateCategoryInput.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTweetInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTweetInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Content = reader.string();
          break;
        case 2:
          message.AccountID = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.Categories.push(
            CreateCategoryInput.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTweetInput {
    return {
      Content: isSet(object.Content) ? String(object.Content) : "",
      AccountID: isSet(object.AccountID) ? Number(object.AccountID) : 0,
      Categories: Array.isArray(object?.Categories)
        ? object.Categories.map((e: any) => CreateCategoryInput.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateTweetInput): unknown {
    const obj: any = {};
    message.Content !== undefined && (obj.Content = message.Content);
    message.AccountID !== undefined &&
      (obj.AccountID = Math.round(message.AccountID));
    if (message.Categories) {
      obj.Categories = message.Categories.map((e) =>
        e ? CreateCategoryInput.toJSON(e) : undefined
      );
    } else {
      obj.Categories = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateTweetInput>, I>>(
    object: I
  ): CreateTweetInput {
    const message = createBaseCreateTweetInput();
    message.Content = object.Content ?? "";
    message.AccountID = object.AccountID ?? 0;
    message.Categories =
      object.Categories?.map((e) => CreateCategoryInput.fromPartial(e)) || [];
    return message;
  },
};

export interface TweetService {
  CreateTweet(request: CreateTweetInput): Promise<AffectedRows>;
}

export class TweetServiceClientImpl implements TweetService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateTweet = this.CreateTweet.bind(this);
  }
  CreateTweet(request: CreateTweetInput): Promise<AffectedRows> {
    const data = CreateTweetInput.encode(request).finish();
    const promise = this.rpc.request("tweet.TweetService", "CreateTweet", data);
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
