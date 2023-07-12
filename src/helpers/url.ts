import { useState, useEffect } from "react";

export const generateSearchUrl = (
  baseUrl: string,
  params: Record<string, string>
): string => {
  const urlSearchParams = new URLSearchParams(params).toString();
  return `${baseUrl}?${urlSearchParams}`;
};

export const useFilteredUrl = (
  baseUrl: string,
  initialFilterParams: Record<string, string>
) => {
  const [filterParams, setFilterParams] = useState(initialFilterParams);
  const [url, setUrl] = useState<string>(
    generateSearchUrl(baseUrl, filterParams)
  );

  useEffect(() => {
    setUrl(generateSearchUrl(baseUrl, filterParams));
  }, [url, setFilterParams]);

  return { url, setFilterParams };
};
