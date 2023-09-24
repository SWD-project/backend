export interface ResponseBody<T> {
  status: "success" | "error" | "warning";
  message: string;
  data: T[];
}

export const errorResponse = (message: any) => {
  const response: ResponseBody<any> = {
    data: [],
    message: message,
    status: "error",
  };
  return response
}