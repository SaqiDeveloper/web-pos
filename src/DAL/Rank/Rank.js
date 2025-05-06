import { invokeApi } from "src/utils";

export const GetRankListing = async (page, per_page, search) => {
  const requestObj = {
    path: `admin/rank?page=${page}&per_page=${per_page}&search=${search}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const CreateRank = async (data) => {
  const requestObj = {
    path: `admin/rank/create`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const DeleteRank = async (id) => {
  const requestObj = {
    path: `admin/rank/delete/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const GetRankById = async (id) => {
  const requestObj = {
    path: `admin/rank/show/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const UpdateRankData = async (id, data) => {
  const requestObj = {
    path: `admin/rank/update/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
