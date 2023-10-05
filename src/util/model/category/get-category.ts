import { Category } from ".";

export interface GetCategoryRequest {
    id: string
}
export interface GetCategoryResponse extends Category {
    
}