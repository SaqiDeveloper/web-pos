import { invokeApi } from "src/utils";

export const GetPromotions = async (page, per_page, search) => {
  const requestObj = {
    path: `admin/promotion?page=${page}&per_page=${per_page}&search=${search}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const AddPromotionData = async (data) => {
  const requestObj = {
    path: `admin/promotion/create`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const EditPromotionData = async (id, data) => {
  const requestObj = {
    path: `admin/promotion/update/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const GetPromotionDataById = async (id) => {
  const requestObj = {
    path: `admin/promotion/show/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
export const DeletePromotion = async (id) => {
  const requestObj = {
    path: `admin/promotion/delete/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};
