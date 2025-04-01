import { useMutation } from "@tanstack/react-query";
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
} from "../services/api/authService";

// packages
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// constants
import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
} from "../services/config/config";

// utils
import { storeData, removeData } from "../utils/AsyncStorage";

type JwtPayload = {
  userId: number;
};

export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: (response) => {
      const decode = jwtDecode(response.accessToken) as JwtPayload;
      storeData(TOKEN_KEY, response.accessToken);
      storeData(REFRESH_TOKEN_KEY, response.refreshToken);
      storeData(USER_ID_KEY, { idx: decode.userId.toString() });
      navigate("/");
      toast.success("로그인에 성공했습니다.");
    },
    onError: () => {
      toast.error("로그인에 실패했습니다.");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchRegister,
    onSuccess: (response) => {
      const decode = jwtDecode(response.accessToken) as JwtPayload;
      storeData(TOKEN_KEY, response.accessToken);
      storeData(REFRESH_TOKEN_KEY, response.refreshToken);
      storeData(USER_ID_KEY, { idx: decode.userId.toString() });
      navigate("/auth/login");
      toast.success("회원가입에 성공했습니다.");
    },
    onError: () => {
      toast.error("회원가입에 실패했습니다.");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      removeData(TOKEN_KEY);
      removeData(REFRESH_TOKEN_KEY);
      removeData(USER_ID_KEY);
      navigate("/auth/login");
      toast.success("로그아웃에 성공했습니다.");
    },
    onError: () => {
      toast.error("로그아웃에 실패했습니다.");
    },
  });
};
