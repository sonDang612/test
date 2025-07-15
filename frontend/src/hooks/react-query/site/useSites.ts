import { useQuery } from "@tanstack/react-query";
import { Site } from "../../../../types";
import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";

type Form = {
  page?: number;
  limit?: number;
  q?: string;
};

const fetchData = async (form: any) => {
  const response = await axiosInstance.post(apiEndpoints.LIST_SITES, form);
  return response?.data?.data?.data?.data;
};

const useSites = (form: Form, options?: any) => {
  const { data, ...query } = useQuery<Site[]>({
    queryKey: [apiEndpoints.LIST_SITES, { type: "ALL" }],
    queryFn: () => fetchData(form),
    ...options,
  });

  return {
    ...query,
    data: data,
  };
};

export { useSites };
