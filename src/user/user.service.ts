import { UserRepository } from "./user.repository";

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository()
  }

  // getUserById(id)
  
}
