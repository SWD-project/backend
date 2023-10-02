import { User } from ".";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  roleId: string;
  phoneNumber: string;
  uuid: string;
}
export interface CreateUserRespone extends User {}
