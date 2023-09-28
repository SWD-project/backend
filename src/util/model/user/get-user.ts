import { User } from "."

export interface GetUserRequest {
    page?: number
    limit?: number
}
export interface GetUserResponse extends User {
}