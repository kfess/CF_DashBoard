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

// under development
type _QueryParams = {
  [key: string]: string | number | string[] | number[] | undefined;
};

export const useURLQuery = (basePath: string = "") => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const getQueryParams = () =>
    Object.fromEntries(new URLSearchParams(search).entries());

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

  return { queryParams: getQueryParams(), setURLQuery };
};
