import { Strategy, ExtractJwt } from "passport-jwt";
import UserUC from "../usecase/user";
import UserRepo from "../repository/user";
import ErrorHandler from "../helper/errorHandler";
import passport from "passport";

const User = new UserUC(new UserRepo());

const opts: any = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new Strategy(opts, async (payload: any, done) => {
    try {
      let user = await User.userByUsername(payload["user"]["username"]);

      if (!user) {
        return done(new ErrorHandler("Incorrect username or password", 400));
      }

      return done(null, user);
    } catch (error: any) {
      return done(new ErrorHandler(error["message"], 500));
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.getUserById(id);
  done(null, user);
});

export default passport;
