import UserRepo from "../repository/user";
import scholarProfile from "../helper/scholarProfile";

class UserAuto {
  User: any;
  Scholar: any;
  constructor() {
    this.User = new UserRepo();
    this.Scholar = scholarProfile;
  }

  scholarProfile = async () => {
    const users = await this.User.GetUsers();

    for await (const user of users.users) {
      if (user["google_scholar"] != null) {
        const scholarProfile = await this.Scholar.getProfile(
          user["google_scholar"]
        );

        if (scholarProfile != null) {
          console.log(scholarProfile);
        }
      }
    }
  };
}

new UserAuto().scholarProfile();
