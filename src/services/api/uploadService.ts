import { API_ENDPOINTS } from "../config/config";
import { post, get, del } from "../config/request";

export const fetchUploadFile = async (file: File, userId: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId.toString());

  const response = await post(API_ENDPOINTS.UPLOAD.FILE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const fetchDownloadFile = async (id: number) => {
  const response = await get(API_ENDPOINTS.UPLOAD.DOWNLOAD + id);
  return response;
};

export const fetchUploadList = async () => {
  const response = await get(API_ENDPOINTS.UPLOAD.LIST);
  return response;
};

export const fetchDeleteUpload = async (id: number) => {
  const response = await del(API_ENDPOINTS.UPLOAD.DELETE + id);
  return response;
};
