export const TOKEN_KEY = "token";

export const API_URL = "http://localhost:3002";

export const CONTENT_TYPE = {
  JSON: "application/json",
};

export const TIMEOUT = 5000;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  BOARD: {
    LIST: "/boards",
    CREATE: "/boards",
    PATCH: "/boards/", // id
    DELETE: "/boards/", // id
  },
  COMMENT: {
    LIST: "/comments",
    CREATE: "/comments",
    PATCH: "/comments/", // id
    DELETE: "/comments/", // id
  },
  USER: {
    LIST: "/users",
    REGISTER: "/users",
  },
  UPLOAD: {
    FILE: "/uploads",
  },
};
