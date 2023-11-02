import { Course } from ".";

export interface CreateCourseRequest {
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  thumbnailUrl: string;
  outcome: string;
  level: number;
  categoryId: string;
}
export interface CreateCourseRespone extends Course {}
