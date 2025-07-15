import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { removeUndefinedParams } from "@/utils/removeUndefinedParams";

export enum QueryParam {
  SORT_BY = "sortBy",
  SORT = "sort",
  ID = "id",
  QUERY_TEXT = "q",
  PASSWORD = "password",
  ROLE = "role",
}

export enum QueryValue {
  CREATED_AT = "createdAt",
  DESC = "DESC",
  ASC = "ASC",
  ADMIN = 0,
}

const fetchData = async <T>({
  page,
  endpoint,
  limit,
  queryParams,
  queryValues,
}: {
  page: number;
  endpoint: string;
  limit?: number;
  queryParams?: string[];
  queryValues?: any[];
}): Promise<{ data: T[]; total: number }> => {
  const queryObject = queryParams?.reduce((acc, key, index) => {
    acc[key] = queryValues?.[index];
    return acc;
  }, {} as Record<string, any>);

  const params = removeUndefinedParams({
    page,
    limit,
    ...queryObject,
  });

  const res = await axiosInstance.post(endpoint, params);

  return {
    data: res?.data?.data?.data?.data || [],
    total: res?.data?.data?.data?.total,
  };
};

const useFetch = <T>({
  endpoint,
  page = 1,
  limit = 10,
  queryParams = [],
  queryValues = [],
  enabled,
  staleTime,
}: {
  endpoint: string;
  page?: number;
  limit?: number;
  queryParams?: string[];
  queryValues?: any[];
  enabled?: any;
  staleTime?: number;
}) => {
  const queryKey = [endpoint, page, { limit, queryParams, queryValues }];

  const queryFn = () =>
    fetchData<T>({
      page,
      endpoint,
      limit,
      queryParams,
      queryValues,
    });

  const query = useQuery<{ data: T[]; total: number }>({
    queryKey,
    queryFn,
    placeholderData: (previousData) => previousData,
    enabled,
    staleTime,
  });

  return {
    ...query,
    data: query.data?.data || [],
    totalElements: query.data?.total || 0,
  };
};

export { useFetch };
