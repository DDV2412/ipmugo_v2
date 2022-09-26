import axios from "axios";
import loggerWinston from "./logger-winston";

class CitationScopus {
  citation = async (doi: string) => {
    try {
      const { data, status, headers } = await axios({
        method: "get",
        url: `https://api.elsevier.com/content/search/scopus?query=DOI(${doi})`,
        headers: {
          "X-ELS-APIKey": process.env.SCOPUS_API_KEY || "",
          "Content-Type": "application/json",
        },
      });

      if (status !== 200 || headers["x-ratelimit-remaining"] == "0") {
        return null;
      }

      return data["search-results"]["entry"][0]["citedby-count"];
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default new CitationScopus();
