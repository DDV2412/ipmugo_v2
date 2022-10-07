import axios from "axios";
import loggerWinston from "./logger-winston";
import cheerio from "cheerio";

class ScholarProfile {
  getProfile = async (scholarId: string) => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `https://scholar.google.com/citations??hl=en&user=${scholarId}`,
        headers: {
          mode: "no-cors",
        },
      });

      if (status != 200) {
        return null;
      }

      const $ = cheerio.load(data);

      const cited = $(".gsc_rsb_std");

      if (cited.length === 0) {
        return null;
      }

      const statistic = await this.getCited($);

      const coAuthors = await this.getCoAuthors($);

      return {
        statistic: {
          total: (cited[0].children[0] as any).data,
          h_index: (cited[2].children[0] as any).data,
          i10_index: (cited[4].children[0] as any).data,
        },
        citedBy: statistic,
        coAuthors: coAuthors,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  private getCited = async ($: any) => {
    const citedBy = $(".gsc_md_hist_b .gsc_g_t");

    if (citedBy.length === 0) {
      return null;
    }

    const citedByYear = citedBy
      .map((i: any) => {
        const year = $(".gsc_md_hist_b .gsc_g_t").eq(i).text();
        const data = $(".gsc_md_hist_b .gsc_g_a").eq(i).text();
        return { year, data };
      })
      .get();

    return citedByYear;
  };

  private getCoAuthors = async ($: any) => {
    const link = $("#gsc_cods_urls").attr("data-lc");

    const { data, status } = await axios({
      method: "get",
      url: `https://scholar.google.com${link}`,
      headers: {
        mode: "no-cors",
      },
    });

    if (status != 200) {
      return null;
    }

    const $1 = cheerio.load(data);

    const coAuthors = $1(".gsc_ucoar .gs_scl")
      .map((i: any) => {
        const name = $1(".gs_ai_name a").eq(i).text();
        const aff = $1(".gs_ai_aff").eq(i).text();

        return {
          name: name,
          aff: aff,
        };
      })
      .get();

    return coAuthors;
  };
}

export default new ScholarProfile();
