class UserUC {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  allUsers = async (filters: {}) => {
    return await this.User.allUsers(filters);
  };
  userByUsername = async (username: string) => {
    return await this.User.userByUsername(username);
  };
  getUserById = async (id: string) => {
    return await this.User.getUserById(id);
  };
  createUser = async (userData: {}) => {
    return await this.User.createUser(userData);
  };
  updateUser = async (user_id: string, userData: {}) => {
    return await this.User.updateUser(user_id, userData);
  };
  deleteUser = async (user_id: string) => {
    return await this.User.deleteUser(user_id);
  };

  saveBookmark = async (userData: {}) => {
    return await this.User.saveBookmark(userData);
  };

  deleteBookmark = async (options: {}) => {
    return await this.User.deleteBookmark(options);
  };

  assignAuthor = async (userData: {}) => {
    return await this.User.assignAuthor(userData);
  };

  deleteAuthor = async (options: {}) => {
    return await this.User.deleteAuthor(options);
  };

  assignEditor = async (userData: {}) => {
    return await this.User.assignEditor(userData);
  };

  deleteEditor = async (options: {}) => {
    return await this.User.deleteEditor(options);
  };
}

export default UserUC;
