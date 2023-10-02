import { Course } from ".";

export interface CreateCourseRequest {
  _id: any;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  thumbnailUrl: string;
  createAt: string;
  updateAt: string;
  outcome: string;
  courseStatusId: string;
  totalLesson: number;
  level: number;
  categoryId: string;
}
export interface CreateCourseRespone extends Course {}
