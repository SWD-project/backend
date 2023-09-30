import { User } from ".";

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
}

export interface UpdateUserResponse extends User {

}
