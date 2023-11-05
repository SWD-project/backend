import { CourseSection } from ".";

export interface CreateCourseSectionRequest {
  timeComplete: string;
  courseId: string;
  title: string;
  description: string;
}
export interface CreateCourseSectionRespone extends CourseSection {}
