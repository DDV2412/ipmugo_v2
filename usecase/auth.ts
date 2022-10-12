import jwt from "jsonwebtoken";

class AuthUC {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  accessToken = async (userData: Record<string, any>) => {
    let user = {
      id: userData["id"],
      salutation: userData["salutation"],
      username: userData["username"],
      name: userData["name"],
      photo_profile: userData["photo_profile"],
      password: userData["password"],
      googleScholar: userData["googleScholar"],
      scopusId: userData["scopusId"],
      orcid: userData["orcid"],
      biograph: userData["biograph"],
      affiliation: userData["affiliation"],
      verified: userData["verified"],
      roles: userData["roles"],
      bookmarks: userData["bookmarks"],
      publish_articles: userData["publish_articles"],
    };
    let payload = {
      user: user,
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    return {
      user: user,
      token: token,
    };
  };
  register = async (userData: Record<string, any>) => {
    let user = await this.User.register(userData);

    if (!user) {
      return null;
    }

    return await this.accessToken(user);
  };
  login = async (userData: Record<string, any>) => {
    let user = await this.User.login(userData);

    if (!user) {
      return null;
    }

    return await this.accessToken(user);
  };
  forgotPassword = async (email: string) => {
    return await this.User.forgotPassword(email);
  };
  resetPassword = async (token: string, email: string, password: string) => {
    return await this.User.resetPassword(token, email, password);
  };
}

export default AuthUC;
