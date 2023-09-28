import { Role } from "../util/model/role";
import { RoleRepository } from "./role.repository";

export class RoleService {
  private roleRepository: RoleRepository;
  constructor() {
    this.roleRepository = new RoleRepository();
  }
  async getRoleById(id: string) {
    const role = (await this.roleRepository.getRole(id)) as unknown as Role;
    if (role == null) return [];
    return [role];
  }
  async getAllRole() {
    const role = (await this.roleRepository.getRole()) as unknown as Role;
    if (role == null) return [];
    return [role];
  }
}
