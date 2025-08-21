import { invokeApi } from "src/utils";

export const login = async (data) => {
  const requestObj = {
    path: `login`,
    method: "POST",
    headers: {},
    postData: data,
  };
  return invokeApi(requestObj);
};

export const logout = async (data) => {
  const requestObj = {
    path: `admin/logout`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
