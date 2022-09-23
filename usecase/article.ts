class ArticleUC {
  Article: any;
  constructor(Article: any) {
    this.Article = Article;
  }

  allArticles = async (filters: {}) => {
    return await this.Article.allArticles(filters);
  };
  articleById = async (id: string) => {
    return await this.Article.articleById(id);
  };
  createArticle = async (articleData: any) => {
    return await this.Article.createArticle(articleData);
  };

  updateArticle = async (article: any, articleData: any) => {
    return await this.Article.updateArticle(article, articleData);
  };

  deleteArticle = async (article: any) => {
    return await this.Article.deleteArticle(article);
  };
}

export default ArticleUC;
