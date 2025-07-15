import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Form = {
  ipAddress: string;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post(
    apiEndpoints.CREATE_ALLOWED_IP,
    form
  );
  return response?.data?.data?.data;
};

const useCreateAllowedIP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: () => {
      toast.success("추가 완료");
      queryClient.invalidateQueries({
        queryKey: [apiEndpoints.LIST_ALLOWED_IP],
      });
    },
  });
};

export { useCreateAllowedIP };
