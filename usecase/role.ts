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
  updateRole = async (role_id: string, roleData: {}) => {
    return await this.Role.updateRole(role_id, roleData);
  };
  deleteRole = async (role_id: string) => {
    return await this.Role.deleteRole(role_id);
  };
}

export default RoleUC;
