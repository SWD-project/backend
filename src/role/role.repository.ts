import { RoleModel } from "./role.entity.ts";

export class RoleRepository {
  public getRole = (id?: string) => {
    if (id) {
      return RoleModel.findById(id);
    } else {
      return RoleModel.find();
    }
  };
  public create = async (name: string) => {
    try {
      const role = await RoleModel.create({ name });
      return role;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo role: " + error.message);
    }
  };
  public update = async (id: string, name: string) => {
    await RoleModel.updateOne({ _id: id }, { name });
  };
}
