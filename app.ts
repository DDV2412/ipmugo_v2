import apm from "elastic-apm-node";

// apm.start({
//   serviceName: process.env.ELASTIC_SERVERNAME,
//   serverUrl: "http://localhost:8200",
//   environment: process.env.NODE_ENV,
// });

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

const JournalUc = new JournalUC(new JournalRepo());
const ArticleUc = new ArticleUC(new ArticleRepo());
const InterestUc = new InterestUC(new InterestRepo());

class Application {
  public app: Express;

  constructor() {
    this.app = express();

    /**
     * Database Checking
     */
    db.authenticate()
      .then(() => {
        console.log("🚩 Connection has been established successfully.");
      })
      .catch((error: ErrorRequestHandler) => {
        console.log("⛔ Unable to connect to the database:", error);
      });

    /**
     * Init Middleware
     */
    this.app.use(helmet());
    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    /**
     * Inject UseCase
     */

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req.uc = [];

      req.uc.JournalUC = JournalUc;
      req.uc.ArticleUC = ArticleUc;
      req.uc.InterestUC = InterestUc;

      next();
    });

    /**
     * Init Routes
     */
    this.app.use("/api", routes);

    this.app.use(express.static(path.join(__dirname, "/./static")));

    this.app.use(errorMiddleware);
  }
}

export = Application;
