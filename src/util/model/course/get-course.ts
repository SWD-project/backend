import { Course } from ".";

export interface GetCourseRequest {
  courseId: string;
}
export interface GetCourseResponse extends Course {}
