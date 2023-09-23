import { User } from ".";

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
}

export interface UpdateUserResponse extends User {

}
