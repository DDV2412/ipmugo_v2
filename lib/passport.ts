import { Strategy, ExtractJwt } from "passport-jwt";
import UserUC from "../usecase/user";
import AuthUC from "../usecase/auth";
import UserRepo from "../repository/user";
import ErrorHandler from "../helper/errorHandler";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

const User = new UserUC(new UserRepo());

const Auth = new AuthUC(new UserRepo());

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

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: String(process.env.CLIENT_ID),
      clientSecret: String(process.env.CLIENT_SECRET),
      callbackURL: String(process.env.CALLBACK),
    },
    async (accessToken, refrestToken, profile, done) => {
      try {
        let user = await User.getUserByEmail(String(profile["_json"]["email"]));

        if (!user) {
          const newUser = await Auth.register({
            username: profile["_json"]["sub"],
            name: profile["_json"]["name"],
            password: profile["_json"]["sub"],
            email: profile["_json"]["email"],
            verified: Date.now(),
          });

          if (newUser) {
            return done(null, newUser.user);
          }
        }

        return done(null, user);
      } catch (error: any) {
        return done(new ErrorHandler(error["message"], 500));
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.getUserById(id);
  done(null, user);
});

export default passport;
