class ArticleUC {
  Article: any;
  constructor(Article: any) {
    this.Article = Article;
  }

  allArticles = async () => {
    return await this.Article.allArticles();
  };

  searchByElastic = async (filters: {}) => {
    return await this.Article.searchByElastic(filters);
  };

  advancedByElastic = async (bodyQuery: {}) => {
    return await this.Article.advancedByElastic(bodyQuery);
  };

  articleById = async (id: string) => {
    return await this.Article.articleById(id);
  };

  articleByDOI = async (doi: string) => {
    return await this.Article.articleByDOI(doi);
  };
  createArticle = async (articleData: {}) => {
    return await this.Article.createArticle(articleData);
  };

  updateArticle = async (article_id: string, articleData: {}) => {
    return await this.Article.updateArticle(article_id, articleData);
  };

  deleteArticle = async (article_id: string) => {
    return await this.Article.deleteArticle(article_id);
  };
}

export default ArticleUC;
