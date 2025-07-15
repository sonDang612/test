import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Form = {
  blackListedUserId: number;
  siteId: number;
  ipAddress: string;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post(
    apiEndpoints.DELETE_BLACK_LISTED_USER,
    form
  );
  return response?.data?.data?.data;
};

const useDeleteBlackListedUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: () => {
      toast.success("삭제 성공");
      queryClient.invalidateQueries({
        queryKey: [apiEndpoints.LIST_BLACK_LISTED_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [apiEndpoints.GET_BLACK_LISTED_USER_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [apiEndpoints.GET_STATISTICS_OVERVIEW],
      });
    },
  });
};

export { useDeleteBlackListedUser };
