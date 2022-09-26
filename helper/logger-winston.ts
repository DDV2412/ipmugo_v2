import winston from "winston";
import path from "path";

class Logger {
  appendDate: string;
  options: any;
  loggerWinston: any;
  constructor() {
    this.appendDate = new Date().toISOString();

    this.options = {
      alllog: {
        filename: path.join(__dirname, "/../logs/app-log.log"),
        level: "debug",
        format: winston.format.combine(
          winston.format.timestamp({ format: this.appendDate }),
          winston.format.colorize(),
          winston.format.json()
        ),
      },
      errorlog: {
        filename: path.join(__dirname, "/../logs/app-error.log"),
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp({ format: this.appendDate }),
          winston.format.colorize(),
          winston.format.json()
        ),
      },
      warnlog: {
        filename: path.join(__dirname, "/../logs/app-warn.log"),
        level: "warn",
        format: winston.format.combine(
          winston.format.timestamp({ format: this.appendDate }),
          winston.format.colorize(),
          winston.format.json()
        ),
      },
      httplog: {
        level: "verbose",
        format: winston.format.combine(
          winston.format.timestamp({ format: this.appendDate }),
          winston.format.colorize(),
          winston.format.json()
        ),
      },
      console: {
        level: "debug",
        format: winston.format.combine(
          winston.format.timestamp({ format: this.appendDate }),
          winston.format.colorize(),
          winston.format.json()
        ),
      },
      rejection: {
        filename: path.join(__dirname, "/../logs/app-rejection.log"),
      },
    };

    this.loggerWinston = winston.createLogger({
      transports: [
        new winston.transports.File(this.options.alllog),
        new winston.transports.File(this.options.errorlog),
        new winston.transports.File(this.options.warnlog),
        new winston.transports.Http(this.options.httplog),
        new winston.transports.Console(this.options.console),
      ],

      rejectionHandlers: [new winston.transports.File(this.options.rejection)],
      exitOnError: false,
    });

    this.loggerWinston.stream = {
      write(message: string) {
        this.loggerWinston.info(message);
      },
    };
  }
}

export default new Logger().loggerWinston;
