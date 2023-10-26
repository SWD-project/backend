import { Course } from "../course";

export interface GetEnrolledCourseRequest {}
export interface GetEnrolledCourseResponse {
    _id: any;
    studentId: string;
    courseId: Course;
    createdAt: string;
    updatedAt: string;
    totalCompleteLesson: number;
}
