import { invokeApi } from "src/utils";

export const GetBannerList = async () => {
  const requestObj = {
    path: `admin/banner`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const AddBannerData = async (data) => {
  const requestObj = {
    path: `admin/banner/create`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const DeleteBanner = async (id) => {
  const requestObj = {
    path: `admin/banner/delete/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const UpdateBannerData = async (id, data) => {
  const requestObj = {
    path: `admin/banner/update/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const UpdateBannerStatus = async (id, data) => {
  const requestObj = {
    path: `admin/banner/status/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
