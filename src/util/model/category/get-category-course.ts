import { Category } from ".";
import { Course } from "../course";

export interface GetCategoryCourse extends Category {
  course: Course[];
}
