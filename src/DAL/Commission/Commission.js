import { invokeApi } from "src/utils";

export const AllLevelsCommission = async () => {
  const requestObj = {
    path: `admin/referral/levels`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};
export const AddCommissionData = async (id, data) => {
  const requestObj = {
    path: `admin/referral/update/${id}`,
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    postData: data,
  };
  return invokeApi(requestObj);
};
