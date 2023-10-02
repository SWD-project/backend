import { UserModel } from "./user.entity.ts";

export class UserRepository {
  public getUser = async (id?: string) => {
    if (id) {
      return await UserModel.findById(id);
    } else {
      return await UserModel.find();
    }
  };

  public getUserByUuid = async (uuid: string) => {
    try {
      return await UserModel.findOne({ uuid });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  public createUser = async (
    email: string,
    firstName: string,
    lastName: string,
    roleId: string,
    uuid: string,
  ) => {
    try {
      const createdUser = await UserModel.create({
        email,
        firstName,
        lastName,
        roleId,
        uuid,
      });
      return createdUser;
    } catch (error: any) {
      console.log(error);
      throw new Error("Lỗi khi tạo thông tin người dùng: " + error.message);
    }
  };

  public updateUserByUuid = async (
    uuid: string,
    updatedData: {
      firstName: string;
      lastName: string;
      email: string;
    }
  ) => {
    try {
      const updatedUser = await UserModel.updateOne(
        { uuid },
        { $set: updatedData }
      );
      return updatedUser.modifiedCount;
    } catch (error: any) {
      throw new Error(
        "Lỗi khi cập nhật thông tin người dùng: " + error.message
      );
    }
  };

  public deleteUser = async (id: string) => {
    try {
      const deletedUser = await UserModel.findByIdAndRemove(id);
      return deletedUser;
    } catch (error: any) {
      throw new Error("Lỗi khi xóa người dùng: " + error.message);
    }
  };
}
