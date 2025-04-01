import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// services
import {
  fetchCommentList,
  fetchCommentCreate,
  fetchCommentUpdate,
  fetchCommentDelete,
} from "../services/api/commentService";

// packages
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useCommentList = ({
  offset,
  count,
  boardId,
}: {
  offset: number;
  count: number;
  boardId: number;
}) => {
  return useQuery({
    queryKey: ["comments", offset, count],
    queryFn: async () => {
      const response = await fetchCommentList({ offset, count, boardId });
      return response.commentList;
    },
  });
};

export const useCommentCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCommentCreate,
    onSuccess: () => {
      toast.success("댓글이 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      toast.error("댓글 생성에 실패했습니다.");
    },
  });
};

export const useCommentUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCommentUpdate,
    onSuccess: () => {
      toast.success("댓글이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      toast.error("댓글 수정에 실패했습니다.");
    },
  });
};

export const useCommentDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchCommentDelete,
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("댓글 삭제에 실패했습니다.");
    },
  });
};
