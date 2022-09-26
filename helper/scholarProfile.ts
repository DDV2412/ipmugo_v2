import axios from "axios";
import loggerWinston from "./logger-winston";

class ScholarProfile {
  getData = async (scholarId: string) => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `https://scholar.google.com/citations?user=${scholarId}`,
        headers: {
          mode: "no-cors",
        },
      });

      if (status != 200) {
        return null;
      }
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default new ScholarProfile();
