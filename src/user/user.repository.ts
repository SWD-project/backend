import { CreateUser } from "../util/model/user/create-user.ts";
import { UpdateUserRequest } from "../util/model/user/update-user.ts";
import { UserModel } from "./user.entity.ts";

export class UserRepository {
  public getUser = (id?: string) => {
    if (id) {
      return UserModel.findById(id);
    } else {
      return UserModel.find();
    }
  };

  public getUserByUuid = async (uuid: string) => {
    try {
      return UserModel.find({ uuid });
    } catch (error: any) {
      console.log(error.message);
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

  public createUser = async (userData: CreateUser) => {
    try {
      const newUser = new UserModel(userData);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo thông tin người dùng: " + error.message);
    }
  };

  public updateUserByUuid = async (
    uuid: string,
    updatedData: UpdateUserRequest
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
