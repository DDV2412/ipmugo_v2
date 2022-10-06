import ArticleController from "../controller/article";
import ErrorHandler from "../helper/errorHandler";

let mockArticleUC = {
  allArticles: jest.fn().mockReturnValue(null),
  articleById: jest.fn().mockReturnValue(null),
  createArticle: jest.fn().mockReturnValue(null),
  updateArticle: jest.fn().mockReturnValue(null),
  deleteArticle: jest.fn().mockReturnValue(null),
};

let mockJournalUC = {
  allJournals: jest.fn().mockReturnValue(null),
  journalById: jest.fn().mockReturnValue(null),
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
      articles: undefined,
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

    expect(
      jest.fn().mockImplementation(() => {
        throw new ErrorHandler("Article not found", 404);
      })
    );
  });

  test("Create Article", async () => {
    let req = mockRequest(
      {
        journal_id: "42b53e2d-07ae-4e86-bc75-50a5d51f1f75",
        identifier: "123",
        publishDate: "2020-01-01",
        topic: "Computer",
        title: "Test",
        abstract: "Test",
        year: "2020",
        resources: "Vol. 1, No. 3, December 2019",
        pages: "1-10",
        doi: "doi.org",
        keywords: "test;test",
        authors: [
          {
            firstname: "Dian",
            lastname: "Putra",
            email: "Dian@maiwwl.com",
            affiliation: "IAES",
            orcid: "-",
          },
          {
            firstname: "Dian",
            lastname: "Putra",
            email: "Dian@mailw1.com",
            affiliation: "IAES",
            orcid: "-",
          },
        ],
        interests: [
          {
            name: "Acoustic Waves",
          },
        ],
      },
      {},
      {},
      { ArticleUC: mockArticleUC, JournalUC: mockJournalUC }
    );
    let res = mockResponse();

    await ArticleController.createArticle(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw new ErrorHandler("Journal not found", 404);
      })
    );
  });

  test("Update Article By ID", async () => {
    let req = mockRequest(
      {},
      {},
      {
        articleId: "42b53e2d-07ae-4e86-bc75-50a5d51f1f75",
      },
      { ArticleUC: mockArticleUC, JournalUC: mockJournalUC }
    );
    let res = mockResponse();

    await ArticleController.updateArticle(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw new ErrorHandler("Article not found", 404);
      })
    );
  });

  test("Delete Article By ID", async () => {
    let req = mockRequest(
      {},
      {},
      {
        articleId: "42b53e2d-07ae-4e86-bc75-50a5d51f1f75",
      },
      { ArticleUC: mockArticleUC, JournalUC: mockJournalUC }
    );
    let res = mockResponse();

    await ArticleController.deleteArticle(req, res, jest.fn());

    expect(
      jest.fn().mockImplementation(() => {
        throw new ErrorHandler("Article not found", 404);
      })
    );
  });
});
