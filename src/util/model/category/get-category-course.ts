import { Category } from ".";
import { Course } from "../course";

export interface GetCategoryCourseRequest {
  id: string
}
export interface GetCategoryCourseResponse extends Category {
  course: Course[];
}
