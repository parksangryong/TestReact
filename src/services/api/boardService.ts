import { API_ENDPOINTS } from "../config/config";
import { get, post, patch, del } from "../config/request";

// BoardList 조회 파라미터
interface FetchBoardListParams extends Record<string, unknown> {
  offset?: number;
  count?: number;
}

export const fetchBoardList = async (params: FetchBoardListParams) => {
  const response = await get(API_ENDPOINTS.BOARD.LIST, params);
  return response;
};

// BoardCreate 파라미터
interface FetchBoardCreateParams extends Record<string, unknown> {
  title: string;
  content: string;
  userId: number;
}

export const fetchBoardCreate = async (params: FetchBoardCreateParams) => {
  const response = await post(API_ENDPOINTS.BOARD.CREATE, params);
  return response;
};

// BoardUpdate 파라미터
interface FetchBoardUpdateParams extends Record<string, unknown> {
  data: {
    title: string;
    content: string;
    userId: number;
  };
  id: number;
}

export const fetchBoardUpdate = async (params: FetchBoardUpdateParams) => {
  const response = await patch(
    API_ENDPOINTS.BOARD.PATCH + params.id,
    params.data
  );
  return response;
};

// BoardDelete 파라미터
export const fetchBoardDelete = async (id: number) => {
  const response = await del(API_ENDPOINTS.BOARD.DELETE + id);
  return response;
};
