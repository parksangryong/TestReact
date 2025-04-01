import { API_ENDPOINTS } from "../config/config";
import { get, patch, del } from "../config/request";

export const fetchUserList = async () => {
  const response = await get(API_ENDPOINTS.USER.LIST);
  return response;
};

export const fetchUserDetail = async (id: number) => {
  const response = await get(API_ENDPOINTS.USER.DETAIL + id);
  return response;
};

export interface UpdateUser {
  data: {
    name: string;
    age: number;
    password: string;
  };
  id: number;
}

export const updateUser = async (params: UpdateUser) => {
  const response = await patch(
    API_ENDPOINTS.USER.PATCH + params.id,
    params.data
  );
  return response;
};

export const deleteUser = async (id: number) => {
  const response = await del(API_ENDPOINTS.USER.DELETE + id);
  return response;
};
