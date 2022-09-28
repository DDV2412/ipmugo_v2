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
  updateUser = async (user: {}, userData: {}) => {
    return await this.User.updateUser(user, userData);
  };
  deleteUser = async (user: {}) => {
    return await this.User.deleteUser(user);
  };
  saveBookmark = async (userData: {}) => {
    return await this.User.saveBookmark(userData);
  };

  deleteBookmark = async (options: {}) => {
    return await this.User.deleteBookmark(options);
  };

  bookmarkById = async (options: {}) => {
    return await this.User.bookmarkById(options);
  };
}

export default UserUC;
