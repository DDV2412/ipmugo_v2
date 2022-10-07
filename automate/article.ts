import ArticleRepo from "../repository/article";
import JournalRepo from "../repository/journal";
import OAI from "../helper/oai";
import loggerWinston from "../helper/logger-winston";

class ArticleAuto {
  Journal: any;
  Article: any;
  constructor() {
    this.Journal = new JournalRepo();
    this.Article = new ArticleRepo();
  }

  getArticles = async () => {
    try {
      const journals = await this.Journal.GetJournals();

      for await (const journal of journals.journals) {
        const results = await OAI.getHarvest(
          journal["base_url"],
          journal["abbreviation"],
          "2000-01-01",
          `${new Date().toISOString().split("T")[0]}`
        );

        if (typeof results == "undefined" || results == null) {
          loggerWinston.error(journal["name"] + " Error for harvests");
          process.exit(1);
        }

        for await (const result of results) {
          if (
            typeof result["doi"] != "undefined" &&
            result["doi"] != null &&
            result["doi"] != ""
          ) {
            const article = await this.Article.articleByDOI(result["doi"]);

            let interests: any = [];

            if (
              typeof result["subjects"] != "undefined" &&
              result["subjects"] != null
            ) {
              result["subjects"].split(",").map((interest: string) => {
                interests.push({
                  name: interest,
                });
              });
            }
            if (!article) {
              const inputArticle = await this.Article.createArticle({
                journal_id: journal["id"],
                identifier: result["identifier"],
                date_modify: result["date_modify"],
                topic: result["topic"],
                title: result["title"],
                abstract: result["abstract"],
                doi: result["doi"],
                publish_year: result["publish_year"],
                publish_language: result["publish_language"],
                file: result["fileDownload"],
                format: result["format"],
                resources: result["resources"],
                pages: result["pages"],
                keywords: result["keywords"],
                interests: interests,
                publish_date: result["publishDate"],
                authors: result["authors"],
              });

              loggerWinston.info(
                `Successfully add new article ${inputArticle["title"]}`
              );
            } else {
              const update = await this.Article.updateArticle(article["id"], {
                identifier: result["identifier"],
                dateModify: result["date_modify"],
                topic: result["topic"],
                title: result["title"],
                abstract: result["abstract"],
                doi: result["doi"],
                publish_year: result["publish_year"],
                publish_language: result["publish_language"],
                file: result["fileDownload"],
                format: result["format"],
                resources: result["resources"],
                pages: result["pages"],
                keywords: result["keywords"],
                interests: interests,
                publishDate: result["publishDate"],
                authors: result["authors"],
              });

              loggerWinston.info(
                `Successfully update article ${update["title"]}`
              );
            }
          }
        }
      }
    } catch (error) {
      loggerWinston.error(error);
      process.exit(1);
    }
  };
}

new ArticleAuto().getArticles();
