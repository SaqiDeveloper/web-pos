import { invokeApi } from "src/utils";

export const AllUsers = async (page, rowsPerPage, search) => {
  const requestObj = {
    path: `admin/user?page=${page}&per_page=${rowsPerPage}&search=${search}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};
export const FetchUserDetail = async (id) => {
  const requestObj = {
    path: `admin/user/details/${id}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};
export const UpdateUserStatus = async (id, data) => {
  const requestObj = {
    path: `admin/user/status/${id}`,
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const UserPasswordUpdate = async (data) => {
  const requestObj = {
    path: `admin/user/password/update`,
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const UpdateUserProfile = async (data) => {
  const requestObj = {
    path: `admin/user/profile/update`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const AddUserBalance = async (data) => {
  const requestObj = {
    path: `admin/user/add/balance`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const RemoveUserBalance = async (data) => {
  const requestObj = {
    path: `admin/user/remove/balance`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const ChangeCommissionStatus = async (id, data) => {
  const requestObj = {
    path: `admin/user/special/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
