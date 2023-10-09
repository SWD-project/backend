import { Category } from ".";

export interface CreateCategoryRequest {
    name: string
}

export interface CreateCategoryResponse extends Category {
}
