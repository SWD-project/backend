import { User } from "../model/user";
import { UserRepository } from "./user.repository.ts";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string) {
    const user = (await this.userRepository.getUser(id)) as unknown as User;
    if (user === null) return [];
    return [user];
  }

  async updateUserById(id: string, updatedData: any) {
    try {
      const updatedUser = (await this.userRepository.updateUser(
        id,
        updatedData
      )) as unknown as User;
      if (updatedUser == null) {
        return [];
      }
      return [updatedUser];
    } catch (error: any) {
      throw new Error("Lỗi khi cập nhật người dùng: " + error.message);
    }
  }

  async deleteUserById(id: string) {
    try {
      const deletedUser = await this.userRepository.deleteUser(id);
      if (!deletedUser) {
        return "Không tìm thấy người dùng để xóa.";
      }
      return "Xóa người dùng thành công.";
    } catch (error: any) {
      throw new Error("Lỗi khi xóa người dùng: " + error.message);
    }
  }
}
