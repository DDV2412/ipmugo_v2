import ArticleRepo from "../repository/article";
import loggerWinston from "../helper/logger-winston";
import citationScopus from "../helper/citationScopus";
import citationCrossRef from "../helper/citationCrossRef";

class Citation {
  Article: any;
  constructor() {
    this.Article = new ArticleRepo();
  }

  getCitation = async () => {
    try {
      const articles = await this.Article.allArticles();

      for await (const article of articles.rows) {
        const crossRef = await citationCrossRef.citation(article["doi"]);

        if (crossRef != null) {
          await this.Article.citations(article["id"], {
            count: crossRef,
            source: "Crossref",
          });
        }

        if (article["journal"]["scopus_metric"] != null) {
          const scopus = await citationScopus.citation(article["doi"]);

          if (scopus != null) {
            await this.Article.citations(article["id"], {
              count: scopus,
              source: "Scopus",
            });
          }
        }
      }
    } catch (error) {
      loggerWinston.error(error);
      process.exit(1);
    }
  };
}

new Citation().getCitation();
