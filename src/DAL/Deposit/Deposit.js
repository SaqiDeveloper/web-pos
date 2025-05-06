import { invokeApi } from "src/utils";

export const GetAllDeposits = async (status, page, rowsPerPage, search) => {
  const requestObj = {
    path: `admin/deposits/status/${status}?page=${page}&per_page=${rowsPerPage}&search=${search}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const UpdateDepositStatus = async (data) => {
  const requestObj = {
    path: `admin/deposits/update`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
