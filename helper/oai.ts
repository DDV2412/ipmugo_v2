import axios from "axios";
import { DOMParser } from "xmldom";
import loggerWinston from "./logger-winston";

class OAI {
  getHarvest = async (
    url: string,
    setSpec: string,
    fromDate: string,
    untilDate: string
  ) => {
    try {
      let articles: any = [];
      const { data, status } = await axios({
        url: `${url}/oai?verb=ListRecords&metadataPrefix=oai_dc&set=${setSpec}&from=${fromDate}&until=${untilDate}`,
        method: "get",
      });

      const parser = new DOMParser().parseFromString(data);

      if (status != 200 || parser.getElementsByTagName("error").length > 0) {
        loggerWinston.error(`${url} Harvest Error Status ${status}`);
        return null;
      }

      articles = await this.oai_dc(parser);

      if (
        parser.getElementsByTagName("resumptionToken").length > 0 &&
        parser
          .getElementsByTagName("resumptionToken")[0]
          .getAttribute("expirationDate") != ""
      ) {
        articles = articles.concat(
          await this.resumeToken(
            url,
            parser.getElementsByTagName("resumptionToken")[0].firstChild
              ?.nodeValue
          )
        );
      }

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  private resumeToken = async (url: string, token: string | any) => {
    try {
      let articles: any = [];
      const { data, status } = await axios({
        url: `${url}/oai?verb=ListRecords&resumptionToken=${token}`,
        method: "get",
      });

      const parser = new DOMParser().parseFromString(data, "application/xml");

      if (status != 200 || parser.getElementsByTagName("error").length > 0) {
        loggerWinston.error(`${url} Harvest Error Status ${status}`);
        return null;
      }

      articles = await this.oai_dc(parser);

      if (
        parser.getElementsByTagName("resumptionToken").length > 0 &&
        parser
          .getElementsByTagName("resumptionToken")[0]
          .getAttribute("expirationDate") != ""
      ) {
        articles = articles.concat(
          await this.resumeToken(
            url,
            parser.getElementsByTagName("resumptionToken")[0].firstChild
              ?.nodeValue
          )
        );
      }

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  private oai_dc = async (data: any) => {
    try {
      const records = data.getElementsByTagName("record");

      let articles: any = [];

      for (let i = 0; i < records.length; i++) {
        if (
          records[i].getElementsByTagName("header")[0].getAttribute("status") ==
          "deleted"
        ) {
          continue;
        }

        if (records[i].getElementsByTagName("metadata").length == 0) {
          continue;
        }
        const metadata = records[i].getElementsByTagName("metadata")[0];

        if (metadata.getElementsByTagName("oai_dc:dc").length == 0) {
          continue;
        }

        const dc = metadata.getElementsByTagName("oai_dc:dc")[0];

        const authors: any = [];

        const authorData = dc.getElementsByTagName("dc:creator");

        for (let x = 0; x < authorData.length; x++) {
          const author = authorData[x].firstChild?.nodeValue.split(", ");

          let affiliation = null;

          let firstname = author[1].trim();

          if (author[1].trim().split(";").length > 1) {
            affiliation = author[1].trim().split(";")[1];
            firstname = author[1].trim().split(";")[0];
          }

          authors.push({
            firstname: author[1].trim(),
            lastname: author[0].trim(),
            affiliation: affiliation,
          });
        }

        let identifier = records[i]
          .getElementsByTagName("header")[0]
          .getElementsByTagName("identifier")[0]?.firstChild?.data;

        identifier = identifier.split("/")[1];

        let topic = records[i]
          .getElementsByTagName("header")[0]
          .getElementsByTagName("setSpec")[0]?.firstChild?.nodeValue;

        topic = topic.split(":")[1].replaceAll("_", " ");

        let date_modify = records[i]
          .getElementsByTagName("header")[0]
          .getElementsByTagName("datestamp")[0]?.firstChild?.nodeValue;

        let title =
          dc.getElementsByTagName("dc:title")[0]?.firstChild?.nodeValue;

        let abstract =
          dc.getElementsByTagName("dc:description")[0]?.firstChild?.nodeValue;

        let doi =
          dc.getElementsByTagName("dc:identifier")[1]?.firstChild?.nodeValue;

        if (typeof abstract != "undefined" && abstract != null) {
          if (abstract.split("DOI:").length > 1) {
            abstract = abstract.split("DOI:")[0];

            if (abstract.split("DOI:")[1] !== undefined) {
              doi = abstract.split("DOI:")[1].split("doi.org/")[1].trim();
            }
          }
        }

        if (typeof doi != "undefined" && doi != null) {
          if (doi.split("%").length != 1) {
            doi = null;
          }
        }

        let publishDate =
          dc.getElementsByTagName("dc:date")[0]?.firstChild?.nodeValue;

        let publish_year = null;

        if (typeof publishDate != "undefined" || publishDate != null) {
          publish_year = publishDate.split("-")[0];
        }

        let publish_language =
          dc.getElementsByTagName("dc:language")[0]?.firstChild?.nodeValue;

        let fileDownload = dc
          .getElementsByTagName("dc:relation")[0]
          ?.firstChild?.nodeValue?.replace("/view/", "/download/");

        let subjects = dc.getElementsByTagName("dc:subject");

        let subject = null;
        let keywords = null;

        if (typeof subjects != "undefined" || subjects) {
          if (subjects.length < 2) {
            keywords = subjects[0]?.firstChild?.nodeValue
              ?.replaceAll(", ", "; ")
              .replaceAll(",", "; ");
          } else {
            subject = subjects[0]?.firstChild?.nodeValue
              ?.replaceAll("; ", ";")
              .replaceAll(", ", ";")
              .replaceAll(",", ";");
            keywords = subjects[1]?.firstChild?.nodeValue
              ?.replaceAll(", ", "; ")
              .replaceAll(",", "; ");
          }
        }

        let format =
          dc.getElementsByTagName("dc:format")[0]?.firstChild?.nodeValue;

        let resources = dc
          .getElementsByTagName("dc:source")[0]
          ?.firstChild?.nodeValue?.split("; ")[1];

        let pages = dc
          .getElementsByTagName("dc:source")[0]
          ?.firstChild?.nodeValue?.split("; ")[2];

        articles.push({
          identifier: identifier,
          dateModify: date_modify,
          topic: topic,
          title: title,
          abstract: abstract,
          doi: doi,
          publish_year: publish_year,
          publish_language: publish_language,
          file: fileDownload,
          format: format,
          resources: resources,
          pages: pages,
          keywords: keywords,
          subjects: subject,
          publishDate: publishDate,
          authors: authors,
        });
      }

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default new OAI();
