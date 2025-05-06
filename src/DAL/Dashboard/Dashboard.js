import { invokeApi } from "src/utils";

export const GetDashboardData = async () => {
  const requestObj = {
    path: `admin/counts`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
