import {
  API_ENDPOINTS,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
} from "../config/config";
import { post } from "../config/request";
import { storeData, removeData } from "../../utils/AsyncStorage";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  userId: number;
};

type LoginParams = {
  email: string;
  password: string;
};

export const fetchLogin = async (params: LoginParams) => {
  const response = await post(API_ENDPOINTS.AUTH.LOGIN, params);
  const decode = jwtDecode(response.accessToken) as JwtPayload;
  storeData(TOKEN_KEY, response.accessToken);
  storeData(REFRESH_TOKEN_KEY, response.refreshToken);
  storeData(USER_ID_KEY, { idx: decode.userId.toString() });
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
  const decode = jwtDecode(response.accessToken) as JwtPayload;
  storeData(TOKEN_KEY, response.accessToken);
  storeData(REFRESH_TOKEN_KEY, response.refreshToken);
  storeData(USER_ID_KEY, { idx: decode.userId.toString() });
  return response;
};

export const fetchLogout = async () => {
  const response = await post(API_ENDPOINTS.AUTH.LOGOUT);
  removeData(TOKEN_KEY);
  removeData(REFRESH_TOKEN_KEY);
  removeData(USER_ID_KEY);
  window.location.reload();
  return response;
};
