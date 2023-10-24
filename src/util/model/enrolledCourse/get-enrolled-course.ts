import { Course } from "../course";

export interface GetEnrolledCourseRequest {}
export interface GetEnrolledCourseResponse {
    _id: any;
    studentId: string;
    coursedId: Course;
    createdAt: string;
    updateAt: string;
    totalCompleteLesson: number;
}
