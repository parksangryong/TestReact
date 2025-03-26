// API 및 설정 관련
import {
  API_ENDPOINTS,
  API_URL,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
  USER_ID_KEY,
} from "../../services/config/config";

// utils
import { getData, storeData, removeData } from "../../utils/AsyncStorage";

// axios
import axios from "axios";

// Access Token 재발급
export const fetchRefreshAccessToken = async () => {
  try {
    const refreshToken = await getData(REFRESH_TOKEN_KEY);

    const response = await axios.post(
      `${API_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    storeData(TOKEN_KEY, response.data.accessToken);
    storeData(REFRESH_TOKEN_KEY, response.data.refreshToken);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorType = error.response?.data.code;
      console.log(errorType);
      if (errorType === "JWT-002") {
        removeData(TOKEN_KEY);
        removeData(REFRESH_TOKEN_KEY);
        removeData(USER_ID_KEY);
        window.location.reload();
      }
    }
  }
};
