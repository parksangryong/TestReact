import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// services
import {
  fetchUploadFile,
  fetchDownloadFile,
  fetchUploadList,
  fetchDeleteUpload,
} from "../services/api/uploadService";

// packages
import { toast } from "react-hot-toast";

// config
import { API_URL } from "../services/config/config";

export const useUploadList = () => {
  return useQuery({
    queryKey: ["uploads"],
    queryFn: async () => {
      const response = await fetchUploadList();
      return response.files;
    },
  });
};

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: fetchDownloadFile,
    onSuccess: async (res) => {
      const response = await fetch(`${API_URL}/${res.url}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = res.url.split("/").pop() || "image";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      toast.success("파일이 다운로드되었습니다.");
    },
    onError: () => {
      toast.error("파일 다운로드에 실패했습니다.");
    },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUploadFile,
    onSuccess: () => {
      toast.success("파일이 업로드되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
    onError: () => {
      toast.error("파일 업로드에 실패했습니다.");
    },
  });
};

export const useDeleteUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteUpload,
    onSuccess: () => {
      toast.success("파일이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
    onError: () => {
      toast.error("파일 삭제에 실패했습니다.");
    },
  });
};
