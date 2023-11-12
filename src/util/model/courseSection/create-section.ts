import { CourseSection } from ".";

export interface CreateCourseSectionRequest {
  timeComplete: number;
  courseId: string;
  title: string;
  description: string;
}
export interface CreateCourseSectionRespone extends CourseSection {}
