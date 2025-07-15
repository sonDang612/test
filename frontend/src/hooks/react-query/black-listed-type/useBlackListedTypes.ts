import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { BlackListedType } from "../../../../types";

type Form = {
  page?: number;
  limit?: number;
  q?: string;
};

const fetchData = async (form: any) => {
  const response = await axiosInstance.post(
    apiEndpoints.LIST_BLACK_LISTED_TYPES,
    form
  );
  return response?.data?.data?.data;
};

const useBlackListedTypes = (form: Form, options?: any) => {
  const { data, ...query } = useQuery<BlackListedType[]>({
    queryKey: [apiEndpoints.LIST_BLACK_LISTED_TYPES, { type: "ALL" }],
    queryFn: () => fetchData(form),
    ...options,
  });

  return {
    ...query,
    data: data,
  };
};

export { useBlackListedTypes };
