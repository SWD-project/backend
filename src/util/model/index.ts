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
  return response;
};

export const config = {
  student: "0",
  lecture: "1",
  admin: "2",
  courseInactive: 0,
  courseActive: 1,
  basic: 1,
  intermediate: 2,
  advanced: 3,
  vnpay: 1
};
