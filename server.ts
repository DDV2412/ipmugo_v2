import Application from "./app";
import loggerWinston from "./helper/logger-winston";

class App extends Application {
  constructor() {
    super();
    this.app.set("port", process.env.PORT || 8080);
    this.app.set("host", process.env.HOST || `http://localhost`);
  }

  listen = () => {
    this.app.listen(this.app.get("port"), () => {
      loggerWinston.info(
        `⚡️[server]: Server is running at ${this.app.get(
          "host"
        )}:${this.app.get("port")}`
      );
    });
  };
}

new App().listen();
