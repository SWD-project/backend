import { Cart } from ".";
import { CartDetail } from "../cartDetail";

export interface GetCartRequest {
}

export interface GetCartResponse extends Cart{
    cartDetailList: CartDetail[];
}