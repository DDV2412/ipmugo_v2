import axios from "axios";
import loggerWinston from "./logger-winston";

class ScopusMetric {
  getMetric = async (issn: string) => {
    try {
      const { data, status, headers } = await axios({
        method: "get",
        url: `https://api.elsevier.com/content/serial/title?issn=${issn}`,
        headers: {
          "X-ELS-APIKey": process.env.SCOPUS_API_KEY || "",
          "Content-Type": "application/json",
        },
      });

      if (status !== 200 || headers["x-ratelimit-remaining"] == "0") {
        return null;
      }

      let subject_area =
        data[`serial-metadata-response`].entry[0][`subject-area`];
      let snip = data[`serial-metadata-response`].entry[0][`SNIPList`]["SNIP"];
      let sjr = data[`serial-metadata-response`].entry[0][`SJRList`]["SJR"];
      let citeScore =
        data[`serial-metadata-response`].entry[0][`citeScoreYearInfoList`];

      return {
        interests: subject_area,
        snip: snip,
        sjr: sjr,
        citeScore: citeScore,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}
