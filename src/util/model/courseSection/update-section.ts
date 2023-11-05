import { CourseSection } from ".";

export interface UpdateCourseSection {
  timeComplete: number;
  title: string;
  description: string;
}

export interface UpdateCourseSectionRequest {
  _id: any;
  timeComplete: number;
  courseId: string;
  title: string;
  description: string;
}

export interface UpdateCourseSectionRespone {}
