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
}
