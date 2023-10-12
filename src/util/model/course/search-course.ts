import { Course } from ".";

export interface SearchCourseRequest {
    title : string;
    page?: number;
    limit? : number;
}

export interface SearchCourseResponse{
    courses : Course[];
    total : number;
}