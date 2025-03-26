import { API_ENDPOINTS } from "../config/config";
import { get, post, patch, del } from "../config/request";

interface FetchBoardListParams extends Record<string, unknown> {
  offset?: number;
  count?: number;
}

export const fetchBoardList = async (params: FetchBoardListParams) => {
  const response = await get(API_ENDPOINTS.BOARD.LIST, params);
  return response;
};

interface FetchBoardCreateParams extends Record<string, unknown> {
  title: string;
  content: string;
  userId: number;
}

export const fetchBoardCreate = async (params: FetchBoardCreateParams) => {
  const response = await post(API_ENDPOINTS.BOARD.CREATE, params);
  return response;
};

interface FetchBoardUpdateParams extends Record<string, unknown> {
  title: string;
  content: string;
  userId: number;
}

export const fetchBoardUpdate = async (
  id: number,
  params: FetchBoardUpdateParams
) => {
  const response = await patch(API_ENDPOINTS.BOARD.PATCH + id, params);
  return response;
};

export const fetchBoardDelete = async (id: number) => {
  const response = await del(API_ENDPOINTS.BOARD.DELETE + id);
  return response;
};
