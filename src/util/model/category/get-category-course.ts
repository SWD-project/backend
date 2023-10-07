import { Category } from ".";
import { Course } from "../course";

export interface GetCategoryCourseRequest {
  page : number;
  limit : number;
}
export interface GetCategoryCourseResponse {
  _id : string;
  name : string;
  course : Course[];
  total : number;
}

export interface HomeResponse {
  _id : string;
  name : string;
  course : Course[];
}
