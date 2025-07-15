import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { BlackListedUser } from "../../../../types";

type Form = {
  id?: number;
};

const fetchData = async (form: any) => {
  const response = await axiosInstance.post(
    apiEndpoints.GET_BLACK_LISTED_USER_DETAILS,
    form
  );
  return response?.data?.data?.data;
};

const useBlackListedUserById = (form: Form, options?: any) => {
  return useQuery<BlackListedUser>({
    queryKey: [apiEndpoints.GET_BLACK_LISTED_USER_DETAILS, form],
    queryFn: () => fetchData(form),
    enabled: !!form?.id,
    ...options,
  });
};

export { useBlackListedUserById };
