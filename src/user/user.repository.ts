import { UserModel } from "./user.entity.ts";

export class UserRepository {
  public getUser = (id?: string) => {
    if (id) {
      return UserModel.findById(id);
    } else {
      return UserModel.find();
    }
  };
}
