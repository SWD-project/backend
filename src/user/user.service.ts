import { CreateUserRequest } from "../util/model/user/create-user.ts";
import { User } from "../util/model/user/index.ts";
import { UpdateUserRequest } from "../util/model/user/update-user.ts";
import { UserRepository } from "./user.repository.ts";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  public async createNewUser(createUserN: CreateUserRequest) {
    try {
      const createdUser = (await this.userRepository.createUser(
        createUserN.email,
        createUserN.firstName,
        createUserN.lastName,
        createUserN.roleId,
        createUserN.uuid,
      )) as unknown as User;
      return createdUser;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo người dùng: " + error.message);
    }
  }

  public async getUserByUuid(uuid: string) {
    const user = (await this.userRepository.getUserByUuid(
      uuid
    )) as unknown as User;
    if (user === null) return [];
    return [user];
  }

  public async getUserById(id: string) {
    const user = (await this.userRepository.getUser(id)) as unknown as User;
    if (user === null) return [];
    return [user];
  }

  public async updateUserByUuid(uuid: string, updateUser: UpdateUserRequest) {
    try {
      const count = await this.userRepository.updateUserByUuid(
        uuid,
        updateUser
      );
      return count;
    } catch (error: any) {
      throw new Error("Lỗi khi cập nhật người dùng: " + error.message);
    }
  }

  public async deleteUserById(id: string) {
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
