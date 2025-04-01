import { API_ENDPOINTS } from "../config/config";
import { post } from "../config/request";

type LoginParams = {
  email: string;
  password: string;
};

export const fetchLogin = async (params: LoginParams) => {
  const response = await post(API_ENDPOINTS.AUTH.LOGIN, params);

  return response;
};

type RegisterParams = {
  email: string;
  password: string;
  name: string;
  age: number;
};

export const fetchRegister = async (params: RegisterParams) => {
  const response = await post(API_ENDPOINTS.AUTH.REGISTER, params);

  return response;
};

export const fetchLogout = async () => {
  const response = await post(API_ENDPOINTS.AUTH.LOGOUT);

  return response;
};
