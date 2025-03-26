import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// config
import { CONTENT_TYPE, API_URL, TIMEOUT, TOKEN_KEY } from "./config";

// utils
import { getData } from "../../utils/AsyncStorage";
import { fetchRefreshAccessToken } from "../api/jwtService";

/** headers에 액세스, 리프레시 토큰 삽입 */
const setCommonHeaders = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  // 토큰이 없으면 reject 되게끔 담지 않도록한다.
  const accessToken = await getData(TOKEN_KEY);

  if (accessToken !== undefined) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
};

/** Axios 요청 에러 핸들링 */
const handleRequestError = async (err: AxiosError): Promise<void> => {
  await Promise.reject(err);
};

/** Axios 응답 에러 핸들링 */
const handleResponseError = async (
  err: AxiosError
): Promise<AxiosResponse | undefined> => {
  const originalRequest = err.config; // 원래 요청 설정 저장
  const { code } = err.response?.data as AxiosError;

  if (!code) {
    return;
  }

  console.log(code);
  switch (code) {
    case "JWT-001":
      try {
        await fetchRefreshAccessToken();
        // 토큰 리프레시 성공 후 원래 요청 재시도
        if (originalRequest) {
          return instance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
      break;
    default:
      return Promise.reject(err);
  }
};

/** 인스턴스 생성 */
const instance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": CONTENT_TYPE.JSON,
  },
});

/** Axios 응답 성공 핸들링 */
const handleResponseSuccess = async (
  response: AxiosResponse
): Promise<AxiosResponse> => {
  return response;
};

instance.interceptors.request.use(setCommonHeaders, handleRequestError);
instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default instance;
