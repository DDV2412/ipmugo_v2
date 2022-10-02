const Cite = require("citation-js");
import Article from "../models/article";

class CitationRepo {
  cite: typeof Cite;
  Article: typeof Article;
  constructor() {
    this.cite = Cite;
    this.Article = Article;
  }

  citationExport = async (doi: string) => {
    try {
      const citation = await new this.cite(doi);

      const bibFormat = await citation.format("bibtex");

      return bibFormat;
    } catch (error) {
      return null;
    }
  };

  citationFormater = async (options: Record<string, string>) => {
    try {
      const citation = await new this.cite(options["doi"]);

      const citeFormat = await citation.format(options["formatType"]);

      return citeFormat;
    } catch (error) {
      return null;
    }
  };
}

export default CitationRepo;
