import { useLocation, useNavigate } from "react-router-dom";

// クエリパラメータの一覧を管理する
export type QueryParams = "userId" | "someOthers";
type QueryParamMap = { [K in Uppercase<QueryParams>]: QueryParams };

export const QueryParamKeys: QueryParamMap = {
  USERID: "userId",
  SOMEOTHERS: "someOthers",
};

export const useQueryParams = (param: QueryParams): string | null => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  return urlQueries.get(param);
};

/////////////////////////////////
// under development
import type { Classification } from "@features/contests/contest";
import type { Tag } from "@features/problems/problem";
import type { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";

type _QueryParams = {
  userId?: string;
  classification?: Classification;
  fromDifficulty?: number;
  toDifficulty?: number;
  tags?: Tag[];
  solvedStatus?: SolvedStatus;
  [key: string]:
    | string
    | number
    | Tag[]
    | Classification
    | SolvedStatus
    | undefined;
};

export const addQueryParamsToPath = (
  currentPath: string,
  newParams: _QueryParams
): string => {
  const url = new URL(currentPath, window.location.origin);
  const urlSearchParams = new URLSearchParams(url.search);

  for (const [key, value] of Object.entries(newParams)) {
    if (value !== undefined) {
      urlSearchParams.set(key, String(value));
    }
  }

  return `${url.pathname}?${urlSearchParams.toString()}`;
};

const castToQueryParams = (params: Record<string, string>): _QueryParams => {
  return {
    userId: params.userId ? params.userId : undefined,
    classification: params.classification as Classification,
    fromDifficulty: params.fromDifficulty
      ? Number(params.fromDifficulty)
      : undefined,
    toDifficulty: params.toDifficulty ? Number(params.toDifficulty) : undefined,
    tags: params.tags ? (params.tags.split(",") as Tag[]) : undefined,
    solvedStatus: params.solvedStatus as SolvedStatus,
  };
};

export const useURLQuery = (basePath: string = "") => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const getQueryParams = () => {
    const rawParams = Object.fromEntries(new URLSearchParams(search).entries());
    return castToQueryParams(rawParams);
  };

  const setURLQuery = (newQueryParams: _QueryParams) => {
    const updatedQueries = new URLSearchParams();
    const currentQueryParams = getQueryParams();
    const combinedParams = { ...currentQueryParams, ...newQueryParams };

    for (const key in combinedParams) {
      const value = combinedParams[key];
      if (value !== undefined) {
        if (Array.isArray(value)) {
          updatedQueries.set(key, value.join(","));
        } else {
          updatedQueries.set(key, String(value));
        }
      } else {
        updatedQueries.delete(key);
      }
    }
    navigate(`${basePath}?${updatedQueries.toString()}`);
  };

  return {
    queryParams: getQueryParams(),
    setURLQuery,
  };
};
