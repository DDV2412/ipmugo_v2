import express from "express";
import Journal from "../controller/journal";
import Article from "../controller/article";
import fileUpload from "../controller/uploadFile";
import upload from "../lib/multer";
import multer from "multer";
import Interest from "../controller/interest";

class Router {
  router: express.Router;
  constructor() {
    this.router = express.Router();

    /**
     * File Upload
     */

    this.router.post(
      "/upload/:pathName",
      multer({
        storage: upload.storageDestination,
        fileFilter: upload.fileFilter,
      }).single("upload"),
      fileUpload.fileUpload
    );
    /**
     * Journal
     */

    this.router.get("/journals", Journal.allJournals);
    this.router.get("/journal/:journalId", Journal.journalById);
    this.router.post("/journal", Journal.createJournal);
    this.router.put("/journal/:journalId", Journal.updateJournal);
    this.router.delete("/journal/:journalId", Journal.deleteJournal);

    /**
     * Article
     */

    this.router.get("/articles", Article.allArticles);
    this.router.get("/article/:articleId", Article.articleById);
    this.router.post("/article", Article.createArticle);
    this.router.put("/article/:articleId", Article.updateArticle);
    this.router.delete("/article/:articleId", Article.deleteArticle);

    /**
     * Interest
     */

    this.router.get("/interests", Interest.allInterests);
    this.router.get("/interest/:interestId", Interest.interestById);
    this.router.post("/interest", Interest.createInterest);
    this.router.put("/interest/:interestId", Interest.updateInterest);
    this.router.delete("/interest/:interestId", Interest.deleteInterest);
  }
}

export default new Router().router;
