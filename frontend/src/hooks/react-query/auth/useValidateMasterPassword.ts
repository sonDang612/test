import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Form = {
  password: string;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post(
    apiEndpoints.VALIDATE_MASTER_PASSWORD,
    form
  );
  return response?.data?.data?.data;
};

const useValidateMasterPassword = () => {
  return useMutation({
    mutationFn: fetchData,
    onError: () => {
      toast.error("인증 실패");
    },
    onSuccess: () => {
      //toast.success("OK");
    },
  });
};

export { useValidateMasterPassword };
