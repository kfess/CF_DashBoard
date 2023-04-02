import { useLocation } from "react-router-dom";

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
