import { invokeApi } from "src/utils";

export const GetDashboardData = async () => {
  const requestObj = {
    path: `business`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
