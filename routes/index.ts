import express from "express";
import Journal from "../controller/journal";
import Article from "../controller/article";
import fileUpload from "../controller/uploadFile";
import upload from "../lib/multer";
import multer from "multer";
import Interest from "../controller/interest";
import User from "../controller/user";
import Role from "../controller/role";
import Auth from "../controller/auth";
import AuthMiddleware from "../middleware/auth";

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
        limits: {
          files: 1,
          fieldSize: 2048 * 2048,
        },
      }).single("upload"),
      fileUpload.fileUpload
    );

    /**
     * Journal
     */

    this.router.get("/journals", Journal.allJournals);
    this.router.get("/journals/_search", Journal.searchByElastic);
    this.router.get("/journal/:journalId", Journal.journalById);
    this.router.post("/journal", Journal.createJournal);
    this.router.put("/journal/:journalId", Journal.updateJournal);
    this.router.delete("/journal/:journalId", Journal.deleteJournal);

    /**
     * Article
     */

    this.router.get("/articles", Article.allArticles);
    this.router.get("/articles/_search", Article.searchByElastic);
    this.router.get("/articles/_advanced", Article.advancedByElastic);
    this.router.get("/article/:articleId", Article.articleById);
    this.router.post("/article", Article.createArticle);
    this.router.put("/article/:articleId", Article.updateArticle);
    this.router.delete("/article/:articleId", Article.deleteArticle);

    /**
     * Interest
     */

    this.router.get("/interests", Interest.searchByElastic);
    this.router.get("/interest/:interestId", Interest.interestById);
    this.router.post("/interest", Interest.createInterest);
    this.router.put("/interest/:interestId", Interest.updateInterest);
    this.router.delete("/interest/:interestId", Interest.deleteInterest);

    /**
     * User
     */

    this.router.get("/users", User.allUsers);
    this.router.get("/user/:userId", User.getUserById);
    this.router.post("/user", User.createUser);
    this.router.put("/user/:userId", User.updateUser);
    this.router.delete("/user/:userId", User.deleteUser);

    this.router.post(
      "/bookmark/:article_id",
      AuthMiddleware.authenticate,
      User.saveBookmark
    );
    this.router.delete(
      "/delete-bookmark/:article_id",
      AuthMiddleware.authenticate,
      User.deleteBookmark
    );

    this.router.post("/assign-author", User.assignAuthor);
    this.router.delete("/assign-author", User.deleteAuthor);

    this.router.post("/assign-editor", User.assignEditor);
    this.router.delete("/assign-editor", User.deleteEditor);
    /**
     * Role
     */
    this.router.get("/roles", Role.allRoles);
    this.router.get("/role/:roleName", Role.roleByName);
    this.router.post("/role", Role.createRole);
    this.router.put("/role/:roleName", Role.updateRole);
    this.router.delete("/role/:roleName", Role.deleteRole);

    /**
     * Auth
     */
    this.router.post("/login", Auth.login);
  }
}

export default new Router().router;
