import { CourseSection } from ".";

export interface UpdateCourseSection {
  timeComplete: number;
  title: string;
  description: string;
}

export interface UpdateCourseSectionRequest {
  _id:any;
  courseId: string;
  timeComplete: number;
  title: string;
  description: string;
}

export interface UpdateCourseSectionRespone extends CourseSection {}
