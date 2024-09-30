// import { RequestOptions } from "https";
const URL_PREFIX = "http://localhost:3001";

interface FetchOptions extends RequestInit {
  method?: string;
  isCookie?: string;
}

const request = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  options.method = options.method || "GET";

  if (options.method !== "GET") {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }
  options.credentials = "include";

  if (options.isCookie) {
    options.headers = {
      ...options.headers,
      Cookie: options.isCookie,
    };
  }

  const response = await fetch(`${URL_PREFIX}${endpoint}`, options);

  if (
    !response.headers.get("content-length") ||
    response.headers.get("content-length") === "0"
  ) {
    return null as T;
  }

  const data = await response.json();
  if (!response.ok) {
    if (data?.message && Array.isArray(data?.message)) {
      throw new Error(data?.message.join(","));
    } else {
      throw new Error(data?.message || "Something went wrong");
    }
  }
  return data as T;
};

export const get = <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  options.method = "GET";
  return request<T>(endpoint, options);
};

export const post = <B, T = object>(
  endpoint: string,
  body: B,
  options: FetchOptions = {},
): Promise<T> => {
  console.log("body", body);
  options.method = "POST";
  options.body = JSON.stringify(body);
  return request<T>(endpoint, options);
};

export const patch = <B, T = object>(
  endpoint: string,
  body: B,
  options: FetchOptions = {},
): Promise<T> => {
  options.method = "PATCH";
  options.body = JSON.stringify(body);
  return request<T>(endpoint, options);
};

export const del = <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  options.method = "DELETE";
  return request<T>(endpoint, options);
};
