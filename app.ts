import apm from "elastic-apm-node";

apm.start({
  serviceName: process.env.ELASTIC_SERVERNAME,
  environment: process.env.NODE_ENV,
  serverUrl: "http://localhost:8200",
});

import express, {
  ErrorRequestHandler,
  Express,
  Request,
  Response,
  NextFunction,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import errorMiddleware from "./middleware/errorMiddleware";
import path from "path";
import loggerWinston from "./helper/logger-winston";
import passport from "./lib/passport";

/**
 * Import Database
 */
import db from "./models";

/**
 * Import UseCase and Repo
 */
import JournalRepo from "./repository/journal";
import JournalUC from "./usecase/journal";
import ArticleRepo from "./repository/article";
import ArticleUC from "./usecase/article";
import InterestUC from "./usecase/interest";
import InterestRepo from "./repository/interest";
import UserRepo from "./repository/user";
import UserUC from "./usecase/user";
import RoleUC from "./usecase/role";
import RoleRepo from "./repository/role";
import AuthUC from "./usecase/auth";
import CitationUC from "./usecase/citation";
import CitationRepo from "./repository/citations";
import FeatruredUC from "./usecase/featured";
import FeatruredRepo from "./repository/fearured";

const JournalUc = new JournalUC(new JournalRepo());
const ArticleUc = new ArticleUC(new ArticleRepo());
const InterestUc = new InterestUC(new InterestRepo());
const UserUc = new UserUC(new UserRepo());
const RoleUc = new RoleUC(new RoleRepo());
const AuthUc = new AuthUC(new UserRepo());
const CitationUc = new CitationUC(new CitationRepo());
const FeatruredUc = new FeatruredUC(new FeatruredRepo());

class Application {
  public app: Express;

  constructor() {
    this.app = express();

    /**
     * Database Checking
     */
    db.authenticate()
      .then(() => {
        loggerWinston.info("🚩 Connection has been established successfully.");
      })
      .catch((error: ErrorRequestHandler) => {
        loggerWinston.info("⛔ Unable to connect to the database:", error);
      });

    /**
     * Init Middleware
     */

    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());

    /**
     * Inject UseCase
     */

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req.JournalUC = JournalUc;
      req.ArticleUC = ArticleUc;
      req.InterestUC = InterestUc;
      req.UserUC = UserUc;
      req.RoleUC = RoleUc;
      req.AuthUC = AuthUc;
      req.CitationUC = CitationUc;
      req.FeatruredUC = FeatruredUc;
      next();
    });

    /**
     * Init Routes
     */
    this.app.use("/api", routes);

    this.app.use(express.static(path.join(__dirname, "/./static")));

    this.app.use(passport.initialize());
    this.app.use(errorMiddleware);
  }
}

export = Application;
