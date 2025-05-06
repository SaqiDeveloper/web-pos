import { invokeApi } from "src/utils";

export const MethodListingData = async () => {
  const requestObj = {
    path: `admin/methods`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const AddMethodData = async (data) => {
  const requestObj = {
    path: `admin/methods/create`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const UpdateMethodData = async (id, data) => {
  const requestObj = {
    path: `admin/methods/update/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const DeleteMethodData = async (id) => {
  const requestObj = {
    path: `admin/methods/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const UpdateMethodStatus = async (data) => {
  const requestObj = {
    path: `admin/methods/status`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
