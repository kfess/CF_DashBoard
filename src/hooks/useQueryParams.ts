import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Classification } from "@features/contests/contest";
import type { Tag } from "@features/problems/problem";
import type { SolvedStatus as ProblemSolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import type { SolvedStatus as ContestSolvedStatus } from "@features/contests/components/SolvedStatusFilter";
import type { PeriodWord } from "@features/contests/components/PeriodFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import type { VerdictFilter } from "@features/submission/submission";

type KnownQueryParams = {
  userId?: string;
  classification?: Classification;
  period?: PeriodWord;
  verdict?: VerdictFilter;
  language?: LanguageFilter;
  fromDifficulty?: number;
  toDifficulty?: number;
  tags?: Tag[];
  problemSolvedStatus?: ProblemSolvedStatus;
  contestSolvedStatus?: ContestSolvedStatus;
};

type _QueryParams = KnownQueryParams & {
  [key: string]: string | number | Tag[] | undefined;
};

const castToQueryParams = (params: Record<string, string>): _QueryParams => {
  return {
    userId: params.userId ? params.userId : undefined,
    classification: params.classification as Classification,
    period: params.period as PeriodWord,
    language: params.language as LanguageFilter,
    verdict: params.verdict as VerdictFilter,
    fromDifficulty: params.fromDifficulty
      ? Number(params.fromDifficulty)
      : undefined,
    toDifficulty: params.toDifficulty ? Number(params.toDifficulty) : undefined,
    tags: params.tags ? (params.tags.split(",") as Tag[]) : undefined,
    problemSolvedStatus: params.solvedStatus as ProblemSolvedStatus,
    contestSolvedStatus: params.solvedStatus as ContestSolvedStatus,
  };
};

export const useURLQuery = (basePath: string = "") => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const getQueryParams = useCallback(() => {
    const rawParams = Object.fromEntries(new URLSearchParams(search).entries());
    return castToQueryParams(rawParams);
  }, [search]);

  const setURLQuery = useCallback(
    (newQueryParams: _QueryParams) => {
      const updatedQueries = new URLSearchParams();
      const currentQueryParams = getQueryParams();
      const combinedParams = { ...currentQueryParams, ...newQueryParams };

      for (const key in combinedParams) {
        const value = combinedParams[key as keyof KnownQueryParams];
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
    },
    [getQueryParams]
  );

  return {
    queryParams: getQueryParams(),
    setURLQuery,
  };
};
