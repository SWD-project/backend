import { Course } from ".";

export interface SearchCourseRequest {
  title: string;
  categories: string[];
  levels: number[];
  page?: number;
  limit?: number;
}

export interface SearchCourseResponse {
  courses: Course[];
  total: number;
}
