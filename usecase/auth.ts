import jwt from "jsonwebtoken";

class AuthUC {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  accessToken = async (userData: {}) => {
    let user = {
      id: userData["id"],
      username: userData["username"],
      roles: userData["roles"],
      bookmarks: userData["bookmarks"],
    };
    let payload = {
      user: user,
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: "15m",
    });

    return {
      user: user,
      tokenAccess: token,
    };
  };
  register = async (userData: {}) => {
    return await this.User.register(userData);
  };
  login = async (userData: {}) => {
    let user = await this.User.login(userData);

    if (!user) {
      return null;
    }

    return await this.accessToken(user);
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
