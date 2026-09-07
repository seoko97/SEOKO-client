type TokenName = "access-token" | "refresh-token";
type ResponseType = "arrayBuffer" | "blob" | "formData" | "json" | "text";
type RequestOptions = RequestInit & {
  responseType?: ResponseType;
  forwardClientIp?: boolean;
};

export type { TokenName, ResponseType, RequestOptions };
