import { CartDetail } from ".";

export interface GetCartDetailByCourseIdRequest {
    courseId: string;

}
export interface GetCartDetailByCourseIdResponse extends CartDetail {
    
}