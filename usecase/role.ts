class RoleUC {
  Role: any;
  constructor(Role: any) {
    this.Role = Role;
  }
  allRoles = async (filters: Record<string, any>) => {
    return await this.Role.allRoles();
  };
  roleByName = async (name: string) => {
    return await this.Role.roleByName(name);
  };
  createRole = async (roleData: Record<string, any>) => {
    return await this.Role.createRole(roleData);
  };
  updateRole = async (roleName: string, roleData: Record<string, any>) => {
    return await this.Role.updateRole(roleName, roleData);
  };
  deleteRole = async (roleName: string) => {
    return await this.Role.deleteRole(roleName);
  };
}

export default RoleUC;
