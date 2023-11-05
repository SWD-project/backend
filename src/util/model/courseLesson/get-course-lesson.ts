import { CourseLesson } from "../courseLesson";

export interface getCourseLessonRequest {}

export interface getCourseLessonRespone {
  _id: any;
  courseSectionId: string;
  description: string;
  title: string;
  duration: number;
  index: number;
}

// export interface getCourseLessonBySectionRespone {
//   description: string;
//   title: string;
//   duration: number;
// }

export interface GetCourseLessonBySectionRespone {
  _id: any;
  courseSectionId: string;
  description: string;
  title: string;
  duration: number;
  index: number;
}
export interface GetCourseLessonBySectionRequest {
  courseSectionId: string;
  description: string;
  title: string;
  duration: number;
  index: number;
}
