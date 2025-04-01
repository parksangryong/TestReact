import { API_ENDPOINTS } from "../config/config";
import { get, post, patch, del } from "../config/request";

// CommentList 조회 파라미터
interface FetchCommentListParams extends Record<string, unknown> {
  offset?: number;
  count?: number;
  boardId?: number;
}

export const fetchCommentList = async (params: FetchCommentListParams) => {
  const response = await get(API_ENDPOINTS.COMMENT.LIST, params);
  return response;
};

// CommentCreate 파라미터
interface FetchCommentCreateParams extends Record<string, unknown> {
  content: string;
  userId: number;
  boardId: number;
}

export const fetchCommentCreate = async (params: FetchCommentCreateParams) => {
  const response = await post(API_ENDPOINTS.COMMENT.CREATE, params);
  return response;
};

// CommentUpdate 파라미터
interface FetchCommentUpdateParams extends Record<string, unknown> {
  data: {
    content: string;
    userId: number;
    boardId: number;
  };
  id: number;
}

export const fetchCommentUpdate = async (params: FetchCommentUpdateParams) => {
  const response = await patch(
    API_ENDPOINTS.COMMENT.PATCH + params.id,
    params.data
  );
  return response;
};

// CommentDelete 파라미터
export const fetchCommentDelete = async (id: number) => {
  const response = await del(API_ENDPOINTS.COMMENT.DELETE + id);
  return response;
};
