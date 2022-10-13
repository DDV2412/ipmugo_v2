class UserUC {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  allUsers = async (page: number, size: number, filters: string) => {
    return await this.User.allUsers(page, size, filters);
  };
  userByUsername = async (username: string) => {
    return await this.User.userByUsername(username);
  };
  getUserByEmail = async (email: string) => {
    return await this.User.getUserByEmail(email);
  };
  getUserById = async (id: string) => {
    return await this.User.getUserById(id);
  };
  createUser = async (userData: Record<string, any>) => {
    return await this.User.createUser(userData);
  };
  updateUser = async (user_id: string, userData: Record<string, any>) => {
    return await this.User.updateUser(user_id, userData);
  };
  deleteUser = async (user_id: string) => {
    return await this.User.deleteUser(user_id);
  };

  saveBookmark = async (userData: Record<string, any>) => {
    return await this.User.saveBookmark(userData);
  };

  deleteBookmark = async (options: Record<string, any>) => {
    return await this.User.deleteBookmark(options);
  };

  assignAuthor = async (userData: Record<string, any>) => {
    return await this.User.assignAuthor(userData);
  };

  deleteAuthor = async (options: Record<string, any>) => {
    return await this.User.deleteAuthor(options);
  };

  assignEditor = async (userData: Record<string, any>) => {
    return await this.User.assignEditor(userData);
  };

  deleteEditor = async (options: Record<string, any>) => {
    return await this.User.deleteEditor(options);
  };

  synchronizeScholar = async (options: Record<string, any>) => {
    return await this.User.synchronizeScholar(options);
  };
}

export default UserUC;
