import { invokeApi } from "src/utils";

export const WithDrawList = async (status, page, rowsPerPage, search) => {
  const requestObj = {
    path: `admin/withdraw/status/${status}?per_page=${rowsPerPage}&page=${page}&search=${search}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const UpdateStatusWithdraw = async (data) => {
  const requestObj = {
    path: `admin/withdraw/update/status`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
