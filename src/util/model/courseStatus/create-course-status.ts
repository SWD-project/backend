import { CourseStatus } from ".";

export interface createCourseStatusRequest {
  name: string;
}
export interface createCourseStatusResponse extends CourseStatus {}
