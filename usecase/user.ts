class UserUC {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  allUsers = async (filters: {}) => {
    return await this.User.allUsers(filters);
  };
  userByEmail = async (email: string) => {
    return await this.User.userByEmail(email);
  };
  userById = async (id: string) => {
    return await this.User.userById(id);
  };
  createUser = async (userData: {}) => {
    return await this.User.createUser(userData);
  };
  updateUser = async (user: {}, userData: {}) => {
    return await this.User.updateUser(user, userData);
  };
  deleteUser = async (user: {}) => {
    return await this.User.deleteUser(user);
  };
}

export default UserUC;
