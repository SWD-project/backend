import { Course } from "../course";

export interface GetTransactionRequest {}

export interface GetTransactionResponse {
  _id: any;
  studentId: string;
  courseId: Course;
  payment: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
