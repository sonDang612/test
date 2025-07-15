import axiosInstance from "@/utils/axiosInstance";
import { apiEndpoints } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { StatisticsOverview } from "../../../../types";

const fetchData = async () => {
  const response = await axiosInstance.post(
    apiEndpoints.GET_STATISTICS_OVERVIEW
  );
  return response?.data?.data?.data;
};

const useStatisticsOverview = () => {
  return useQuery<StatisticsOverview>({
    queryKey: [apiEndpoints.GET_STATISTICS_OVERVIEW],
    queryFn: fetchData,
  });
};

export { useStatisticsOverview };
