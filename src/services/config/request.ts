import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import instance from "./instance";

interface RequestData {
  [key: string]: unknown;
}

/** POST(url, data) */
export const post = async (
  url: string,
  data?: RequestData,
  config?: AxiosRequestConfig
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await instance.post(url, data, config);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }

    throw err;
  }
};

/** GET(url, data) */
export const get = async (
  url: string,
  data?: RequestData
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await instance.get(url, {
      params: {
        ...data,
      },
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }

    throw err;
  }
};

/** PUT(url, data) */
export const put = async (
  url: string,
  data?: RequestData
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await instance.put(url, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }

    throw err;
  }
};

/** PUT(url, data) */
export const patch = async (
  url: string,
  data?: RequestData
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await instance.patch(url, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }

    throw err;
  }
};

/** DELETE(url, data) */
export const del = async (
  url: string,
  data?: RequestData
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await instance.delete(url, {
      data,
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }

    throw err;
  }
};
