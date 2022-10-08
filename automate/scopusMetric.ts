import JournalRepo from "../repository/journal";
import loggerWinston from "../helper/logger-winston";
import scopusMetric from "../helper/scopusMetric";
require("events").EventEmitter.defaultMaxListeners = 0;

class Metric {
  Journal: any;
  constructor() {
    this.Journal = new JournalRepo();
  }

  getMetric = async () => {
    try {
      const journals = await this.Journal.GetJournals();

      for await (const journal of journals.journals) {
        const metric = await scopusMetric.getMetric(journal["issn"]);

        if (metric != null) {
          loggerWinston.info(metric);
          await this.Journal.scopusMetric(journal["id"], {
            interests: metric["interests"],
            sjr: metric["sjr"][0]["$"],
            snip: metric["snip"][0]["$"],
            citeScore: metric["citeScore"]["citeScoreCurrentMetric"],
            year: metric["citeScore"]["citeScoreCurrentMetricYear"],
            trackScore: metric["citeScore"]["citeScoreTracker"],
            trackYear: metric["citeScore"]["citeScoreTrackerYear"],
          });
        }
      }
    } catch (error) {
      loggerWinston.error(error);
      process.exit(1);
    }
  };
}

new Metric().getMetric();
