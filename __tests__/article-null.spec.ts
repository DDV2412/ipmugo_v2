import ArticleController from "../controller/article";

let mockArticleUC = {
  allArticles: jest.fn().mockReturnValue(null),
  articleById: jest.fn().mockReturnValue(null),
  createArticle: jest.fn().mockReturnValue(null),
  updateArticle: jest.fn().mockReturnValue(null),
  deleteArticle: jest.fn().mockReturnValue(null),
};

let mockRequest = (body = {}, query = {}, params = {}, usecase: any = {}) => {
  return {
    body,
    query,
    params,
    ...usecase,
  };
};

let mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe("Article Return null Testing", () => {
  test("Get All Article", async () => {
    let req = mockRequest({}, {}, {}, { ArticleUC: mockArticleUC });
    let res = mockResponse();

    await ArticleController.allArticles(req, res, jest.fn());

    expect(mockArticleUC.allArticles).toBeCalledWith(
      req.query["page"],
      req.query["size"],
      req.query["filters"]
    );

    expect(res.json).toBeCalledWith({
      status: "success",
      total: undefined,
      currentPage: undefined,
      countPage: undefined,
      articles: [],
    });
  });

  test("Get Article By ID", async () => {
    let req = mockRequest(
      {},
      {},
      {
        articleId: "4578-5874-1236-78512",
      },
      { ArticleUC: mockArticleUC }
    );
    let res = mockResponse();

    await ArticleController.articleById(req, res, jest.fn());

    expect(mockArticleUC.articleById).toBeCalledWith(req.params["articleId"]);

    expect(null);
  });
});
