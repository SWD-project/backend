import { User } from ".";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  uuid: string;
}
export interface CreateUserRespone extends User {}
