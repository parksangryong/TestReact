import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// services
import {
  fetchUserList,
  fetchUserDetail,
  updateUser,
  deleteUser,
} from "../services/api/userService";

// packages
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUserList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetchUserList();
      return response.userList;
    },
  });
};

export const useUserDetail = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await fetchUserDetail(id);
      return response.user[0];
    },
  });
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("유저 정보가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("유저 정보 수정에 실패했습니다.");
    },
  });
};

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("유저 정보가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("유저 정보 삭제에 실패했습니다.");
    },
  });
};
