// common business logic related util methods
import axios from "axios";
import { baseUri } from "../config/config";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) {
  const reqObj = {
    method,
    url: baseUri + path,
    headers,
  };

  reqObj.params = queryParams;

  if (method === "POST") {
    reqObj.data = postData;
  }
  if (method === "PUT") {
    reqObj.data = postData;
  }
  if (method === "DELETE") {
    reqObj.data = postData;
  }

  let results;


  try {
    results = await axios(reqObj);

    return results?.data;
  } catch (error) {

    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return {
      code: error?.response?.status,
      message: error?.response?.data?.message ? error?.response?.data?.message : "",
    };
  }
}
