import axios from "axios";
import loggerWinston from "./logger-winston";

class CitationCrossRef {
  citation = async (doi: string) => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `https://api.crossref.org/works/${doi}`,
      });

      if (status !== 200) {
        return null;
      }

      return data["message"]["is-referenced-by-count"];
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default new CitationCrossRef();
