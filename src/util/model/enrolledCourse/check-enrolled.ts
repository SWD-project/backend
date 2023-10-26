import { EnrolledCourse } from ".";

export interface CheckEnrolledRequest {
    courseId: string;
}

export interface CheckEnrolledResponse extends EnrolledCourse {
}
