import { API_ENDPOINTS } from "../config/config";
import { post } from "../config/request";

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
