import { API_ENDPOINTS } from "../config/config";
import { get, post, patch, del } from "../config/request";

interface FetchCommentListParams extends Record<string, unknown> {
  offset?: number;
  count?: number;
}

export const fetchCommentList = async (params: FetchCommentListParams) => {
  const response = await get(API_ENDPOINTS.COMMENT.LIST, params);
  return response;
};

interface FetchCommentCreateParams extends Record<string, unknown> {
  content: string;
  userId: number;
  boardId: number;
}

export const fetchCommentCreate = async (params: FetchCommentCreateParams) => {
  const response = await post(API_ENDPOINTS.COMMENT.CREATE, params);
  return response;
};

interface FetchCommentUpdateParams extends Record<string, unknown> {
  content: string;
  userId: number;
  boardId: number;
}

export const fetchCommentUpdate = async (
  id: number,
  params: FetchCommentUpdateParams
) => {
  const response = await patch(API_ENDPOINTS.COMMENT.PATCH + id, params);
  return response;
};

export const fetchCommentDelete = async (id: number) => {
  const response = await del(API_ENDPOINTS.COMMENT.DELETE + id);
  return response;
};
