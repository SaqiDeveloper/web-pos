import { invokeApi } from "src/utils";

export const AllUsers = async (page, rowsPerPage, search) => {
  const requestObj = {
    path: `admin/user?page=${page}&per_page=${rowsPerPage}&search=${search}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};
