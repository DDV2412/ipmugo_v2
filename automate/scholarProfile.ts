import UserRepo from "../repository/user";
import scholarProfile from "../helper/scholarProfile";
import loggerWinston from "../helper/logger-winston";
require("events").EventEmitter.defaultMaxListeners = 0;

class UserAuto {
  User: any;
  Scholar: any;
  constructor() {
    this.User = new UserRepo();
    this.Scholar = scholarProfile;
  }

  scholarProfile = async () => {
    try {
      const users = await this.User.GetUsers();

      for await (const user of users.users) {
        if (user["google_scholar"] != null) {
          const scholarProfile = await this.Scholar.getProfile(
            user["google_scholar"]
          );

          if (scholarProfile != null) {
            await this.User.synchronizeScholar({
              user_id: user["id"],
              scholar: scholarProfile,
            });
          }
        }
      }
    } catch (error) {
      loggerWinston.error(error);
      process.exit(1);
    }
  };
}

new UserAuto().scholarProfile();
