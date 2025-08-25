import {invokeApi} from "../../utils";

export const AllBusinesses = async (page, rowsPerPage, search) => {
    const requestObj = {
        path: `business?page=${page}&limit=${rowsPerPage}&search=${search}`,
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return invokeApi(requestObj);
};

export const DeleteBusiness = async (businessId) => {
    const requestObj = {
        path: `business/${businessId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return invokeApi(requestObj);
};

export const UpdateBusiness = async (data) => {
    const requestObj = {
        path: `business/${data.id}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        postData: data,
    };
    return invokeApi(requestObj);
};

