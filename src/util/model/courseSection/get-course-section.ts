import { CourseSection } from ".";

export interface GetCourseSectionRequest {
  timeComplete: number;
  courseId: string;
  title: string;
  description: string;
}
export interface GetCourseSectionResponr extends CourseSection {}
