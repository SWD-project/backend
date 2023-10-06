import { Category } from ".";
import { Course } from "../course";

export interface GetCategoryCourseRequest {
  categoryId: string;
  page: number;
  limit: number;
}
export interface GetCategoryCourseResponse extends Category {
  course: Course[];
  totalPage: number;
}

export interface GetHomePageRequest {

}
export interface GetHomePageResponse extends Array<GetCategoryCourseResponse> {

}
