import { UserModel } from "./user.entity.ts";

export class UserRepository {
  public getUser = (id?: string) => {
    if (id) {
      return UserModel.findById(id);
    } else {
      return UserModel.find();
    }
  };
  public updateUser = async (id: string, updatedData: any) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return updatedUser;
    } catch (error: any) {
      throw new Error(
        "Lỗi khi cập nhật thông tin người dùng: " + error.message
      );
    }
  };

  // Xóa người dùng theo ID
  public deleteUser = async (id: string) => {
    try {
      // Tìm và xóa người dùng dựa trên ID
      const deletedUser = await UserModel.findByIdAndRemove(id);
      return deletedUser;
    } catch (error: any) {
      throw new Error("Lỗi khi xóa người dùng: " + error.message);
    }
  };
}
