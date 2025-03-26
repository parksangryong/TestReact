import { API_ENDPOINTS } from "../config/config";
import { get } from "../config/request";

export const fetchUserList = async () => {
  const response = await get(API_ENDPOINTS.USER.LIST);
  return response;
};
