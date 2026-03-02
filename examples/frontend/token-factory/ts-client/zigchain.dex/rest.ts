/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Any {
  "@type"?: string;
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: { "@type"?: string }[];
}

export interface Coin {
  denom?: string;
  amount?: string;
}

export interface PageRequest {
  /** @format byte */
  key?: string;

  /** @format uint64 */
  offset?: string;

  /** @format uint64 */
  limit?: string;
  count_total?: boolean;
  reverse?: boolean;
}

export interface PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
}

export interface Params {
  /** @format int64 */
  newPoolFeePct?: number;

  /** @format uint64 */
  creationFee?: string;
}

export interface Pool {
  poolId?: string;
  lpToken?: { denom?: string; amount?: string };
  creator?: string;

  /** @format int64 */
  fee?: number;
  formula?: string;
  coins?: { denom?: string; amount?: string }[];
}

export interface PoolUids {
  poolUid?: string;
  poolId?: string;
}

export interface PoolsMeta {
  /** @format uint64 */
  nextPoolId?: string;
}

export interface QueryAllPoolResponse {
  pool?: {
    poolId?: string;
    lpToken?: { denom?: string; amount?: string };
    creator?: string;
    fee?: number;
    formula?: string;
    coins?: { denom?: string; amount?: string }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryAllPoolUidsResponse {
  poolUids?: { poolUid?: string; poolId?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryGetPoolResponse {
  pool?: {
    poolId?: string;
    lpToken?: { denom?: string; amount?: string };
    creator?: string;
    fee?: number;
    formula?: string;
    coins?: { denom?: string; amount?: string }[];
  };
}

export interface QueryGetPoolUidResponse {
  poolUids?: { poolUid?: string; poolId?: string };
}

export interface QueryGetPoolsMetaResponse {
  PoolsMeta?: { nextPoolId?: string };
}

export interface QueryParamsResponse {
  params?: { newPoolFeePct?: number; creationFee?: string };
}

export interface QuerySwapInResponse {
  out?: { denom?: string; amount?: string };
  fee?: { denom?: string; amount?: string };
}

export interface MsgAddLiquidityResponse {
  lptoken?: { denom?: string; amount?: string };
}

export interface MsgCreatePoolResponse {
  poolId?: string;
  base?: { denom?: string; amount?: string };
  quote?: { denom?: string; amount?: string };
  lpToken?: { denom?: string; amount?: string };
}

export interface MsgRemoveLiquidityResponse {
  base?: { denom?: string; amount?: string };
  quote?: { denom?: string; amount?: string };
}

export interface MsgSwapResponse {
  swapped?: { denom?: string; amount?: string };
  base?: string;
  quote?: string;
}

export type MsgUpdateParamsResponse = object;

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title HTTP API Console zigchain.dex
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/zigchain/dex/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<
      { params?: { newPoolFeePct?: number; creationFee?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryListPool
   * @request GET:/zigchain/dex/pool
   */
  queryListPool = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pool?: {
          poolId?: string;
          lpToken?: { denom?: string; amount?: string };
          creator?: string;
          fee?: number;
          formula?: string;
          coins?: { denom?: string; amount?: string }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/pool`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetPool
   * @request GET:/zigchain/dex/pool/{poolId}
   */
  queryGetPool = (poolId: string, params: RequestParams = {}) =>
    this.request<
      {
        pool?: {
          poolId?: string;
          lpToken?: { denom?: string; amount?: string };
          creator?: string;
          fee?: number;
          formula?: string;
          coins?: { denom?: string; amount?: string }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/pool/${poolId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryListPoolUids
   * @request GET:/zigchain/dex/pool_uids
   */
  queryListPoolUids = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      { poolUids?: { poolUid?: string; poolId?: string }[]; pagination?: { next_key?: string; total?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/pool_uids`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetPoolUid
   * @request GET:/zigchain/dex/pool_uids/{base}/{quote}
   */
  queryGetPoolUid = (base: string, quote: string, params: RequestParams = {}) =>
    this.request<
      { poolUids?: { poolUid?: string; poolId?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/pool_uids/${base}/${quote}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetPoolsMeta
   * @request GET:/zigchain/dex/pools_meta
   */
  queryGetPoolsMeta = (params: RequestParams = {}) =>
    this.request<
      { PoolsMeta?: { nextPoolId?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/pools_meta`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySwapIn
   * @request GET:/zigchain/dex/swap_in/{poolId}/{coinIn}
   */
  querySwapIn = (poolId: string, coinIn: string, params: RequestParams = {}) =>
    this.request<
      { out?: { denom?: string; amount?: string }; fee?: { denom?: string; amount?: string } },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/zigchain/dex/swap_in/${poolId}/${coinIn}`,
      method: "GET",
      ...params,
    });
}
