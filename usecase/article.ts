class ArticleUC {
  Article: any;
  constructor(Article: any) {
    this.Article = Article;
  }

  allArticles = async (
    page: number,
    size: number,
    filters: Record<string, string>
  ) => {
    return await this.Article.allArticles(page, size, filters);
  };

  articleById = async (id: string) => {
    return await this.Article.articleById(id);
  };

  articleByDOI = async (doi: string) => {
    return await this.Article.articleByDOI(doi);
  };
  createArticle = async (articleData: any) => {
    return await this.Article.createArticle(articleData);
  };

  updateArticle = async (
    article_id: string,
    articleData: Record<string, any>
  ) => {
    return await this.Article.updateArticle(article_id, articleData);
  };

  deleteArticle = async (article_id: string) => {
    return await this.Article.deleteArticle(article_id);
  };
}

export default ArticleUC;
