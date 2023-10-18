import { Course } from ".";
import { User } from "../user";

export interface GetCourseRequest {
  courseId: string;
}
export interface GetCourseResponse {
  _id: any;
  title: string;
  rating: number;
  description: string;
  price: number;
  discountPercent: number;
  thumbnailUrl: string;
  createAt: string;
  updateAt: string;
  outcome: string;
  courseStatus: number;
  totalLesson: number;
  level: number;
  categoryId: number;
  lectureId: User
}
