import { CourseLesson } from ".";

export interface CreateCourseLessonRequest {
  courseSectionId: string;
  description: string;
  title: string;
  duration: number;
  index: number;
}

export interface CreateCourseLessonRespone extends CourseLesson {}
