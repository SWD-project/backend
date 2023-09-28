import { RoleModel } from "./role.entity";

export class RoleRepository {
  public getRole = (id?: string) => {
    if (id) {
      return RoleModel.findById(id);
    } else {
      return RoleModel.find();
    }
  };
}
