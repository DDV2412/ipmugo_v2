class AuthUC {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  register = async (userData: {}) => {
    return await this.User.register(userData);
  };
  login = async (userData: {}) => {
    return await this.User.login(userData);
  };
  forgotPassword = async (email: string) => {
    return await this.User.forgotPassword(email);
  };
  resetPassword = async (password: string) => {
    return await this.User.resetPassword(password);
  };
  logout = async () => {
    return await this.User.logout();
  };
}

export default AuthUC;
