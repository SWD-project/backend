import { CartDetail } from "../cartDetail";

export interface GetCartRequest {
}

export interface GetCartResponse {
    id: string;
    studentId: any;
    cartDetailList: CartDetail[];
}