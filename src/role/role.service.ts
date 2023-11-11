import { Role } from "../util/model/role";
import { CreateRoleRequest } from "../util/model/role/create.ts";
import { RoleRepository } from "./role.repository.ts";

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
  public async createRole(name: string) {
    try {
      const role = (await this.roleRepository.create(name)) as unknown as Role;
      return [role];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo role: " + error.message);
    }
  }
  public async updateRole(id: string, name: string) {
    await this.roleRepository.update(id, name);
  }
}
