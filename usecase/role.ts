class RoleUC {
  Role: any;
  constructor(Role: any) {
    this.Role = Role;
  }
  allRoles = async (filters: {}) => {
    return await this.Role.allRoles();
  };
  roleByName = async (name: string) => {
    return await this.Role.roleByName(name);
  };
  createRole = async (roleData: {}) => {
    return await this.Role.createRole(roleData);
  };
  updateRole = async (role: {}, roleData: {}) => {
    return await this.Role.updateRole(role, roleData);
  };
  deleteRole = async (role: {}) => {
    return await this.Role.deleteRole(role);
  };
}

export default RoleUC;
