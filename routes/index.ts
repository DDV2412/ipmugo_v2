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
import Citation from "../controller/citation";
import Featured from "../controller/featured";

class Router {
  router: express.Router;
  constructor() {
    this.router = express.Router();

    /**
     * File Upload
     */

    this.router.post(
      "/upload/:pathName",
      AuthMiddleware.authenticate,
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
    this.router.get("/journal/:journalId", Journal.journalById);
    this.router.post(
      "/journal",
      AuthMiddleware.authenticate,
      Journal.createJournal
    );
    this.router.put(
      "/journal/:journalId",
      AuthMiddleware.authenticate,
      Journal.updateJournal
    );
    this.router.delete(
      "/journal/:journalId",
      AuthMiddleware.authenticate,
      Journal.deleteJournal
    );

    /**
     * Article
     */

    this.router.get("/articles", Article.allArticles);
    this.router.get("/article/:articleId", Article.articleById);
    this.router.post(
      "/article",
      AuthMiddleware.authenticate,
      Article.createArticle
    );
    this.router.put(
      "/article/:articleId",
      AuthMiddleware.authenticate,
      Article.updateArticle
    );
    this.router.delete(
      "/article/:articleId",
      AuthMiddleware.authenticate,
      Article.deleteArticle
    );

    /**
     * Interest
     */

    this.router.get("/interests", Interest.allInterests);
    this.router.get("/interest/:interestId", Interest.interestById);
    this.router.post(
      "/interest",
      AuthMiddleware.authenticate,
      Interest.createInterest
    );
    this.router.put(
      "/interest/:interestId",
      AuthMiddleware.authenticate,
      Interest.updateInterest
    );
    this.router.delete(
      "/interest/:interestId",
      AuthMiddleware.authenticate,
      Interest.deleteInterest
    );

    /**
     * User
     */

    this.router.get("/users", AuthMiddleware.authenticate, User.allUsers);
    this.router.get(
      "/user/:userId",
      AuthMiddleware.authenticate,
      User.getUserById
    );
    this.router.post("/user", AuthMiddleware.authenticate, User.createUser);
    this.router.put(
      "/user/:userId",
      AuthMiddleware.authenticate,
      User.updateUser
    );
    this.router.delete(
      "/user/:userId",
      AuthMiddleware.authenticate,
      User.deleteUser
    );
    this.router.get(
      "/synchronize/:scholarId",
      AuthMiddleware.authenticate,
      User.synchronizeScholar
    );

    this.router.post(
      "/bookmark",
      AuthMiddleware.authenticate,
      User.saveBookmark
    );
    this.router.delete(
      "/delete-bookmark",
      AuthMiddleware.authenticate,
      User.deleteBookmark
    );

    this.router.post("/forgot-password", Auth.forgotPassword);

    this.router.post("/reset-password", Auth.resetPassword);

    this.router.post("/request-verify", Auth.requestEmailVerify);

    this.router.get("/verify-email", Auth.emailVerify);

    this.router.delete(
      "/profile",
      AuthMiddleware.authenticate,
      Auth.deleteProfile
    );

    this.router.get("/login/google", AuthMiddleware.google, Auth.loginGoogle);

    this.router.post("/contact", Featured.contact);

    this.router.post("/subscribe", Featured.subscribe);

    this.router.get(
      "/contact",
      AuthMiddleware.authenticate,
      Featured.contactList
    );

    this.router.get(
      "/contact/:contactId",
      AuthMiddleware.authenticate,
      Featured.contactDetail
    );

    this.router.get(
      "/subscribe",
      AuthMiddleware.authenticate,
      Featured.subscribeList
    );

    this.router.patch(
      "/profile/update",
      AuthMiddleware.authenticate,
      Auth.updateProfile
    );

    this.router.patch(
      "/profile/password",
      AuthMiddleware.authenticate,
      Auth.updatePassword
    );

    this.router.post(
      "/assign-author",
      AuthMiddleware.authenticate,
      User.assignAuthor
    );
    this.router.delete(
      "/assign-author",
      AuthMiddleware.authenticate,
      User.deleteAuthor
    );

    this.router.post(
      "/assign-editor",
      AuthMiddleware.authenticate,
      User.assignEditor
    );
    this.router.delete(
      "/assign-editor",
      AuthMiddleware.authenticate,
      User.deleteEditor
    );

    this.router.post("/citation", Citation.citationExport);

    this.router.post("/citation-formater", Citation.citationFormater);
    /**
     * Role
     */
    this.router.get("/roles", AuthMiddleware.authenticate, Role.allRoles);
    this.router.get(
      "/role/:roleName",
      AuthMiddleware.authenticate,
      Role.roleByName
    );
    this.router.post("/role", AuthMiddleware.authenticate, Role.createRole);
    this.router.put(
      "/role/:roleName",
      AuthMiddleware.authenticate,
      Role.updateRole
    );
    this.router.delete(
      "/role/:roleName",
      AuthMiddleware.authenticate,
      Role.deleteRole
    );

    /**
     * Auth
     */
    this.router.post("/login", Auth.login);
    this.router.post("/register", Auth.register);
    /**
     * Features
     */
    this.router.get("/search", Featured.search);
    this.router.post("/advanced", Featured.advanced);
    this.router.get("/featured/articles", Featured.featuredArticles);
    this.router.get("/featured/authors", Featured.featuredAuthors);
  }
}

export default new Router().router;
