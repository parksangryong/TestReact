import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// services
import {
  fetchBoardList,
  fetchBoardCreate,
  fetchBoardUpdate,
  fetchBoardDelete,
} from "../services/api/boardService";

// packages
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useBoardList = ({
  offset,
  count,
}: {
  offset: number;
  count: number;
}) => {
  return useQuery({
    queryKey: ["boards", offset, count],
    queryFn: async () => {
      const response = await fetchBoardList({ offset, count });
      console.log("response", response);
      return response.boardList;
    },
  });
};

export const useBoardCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchBoardCreate,
    onSuccess: () => {
      toast.success("게시글이 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: () => {
      toast.error("게시글 생성에 실패했습니다.");
    },
  });
};

export const useBoardUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchBoardUpdate,
    onSuccess: () => {
      toast.success("게시글이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: () => {
      toast.error("게시글 수정에 실패했습니다.");
    },
  });
};

export const useBoardDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchBoardDelete,
    onSuccess: () => {
      toast.success("게시글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("게시글 삭제에 실패했습니다.");
    },
  });
};
