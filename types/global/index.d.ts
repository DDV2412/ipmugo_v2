declare global {
  namespace Express {
    export interface Request {
      JournalUC: any;
      ArticleUC: any;
      InterestUC: any;
      UserUC: any;
      RoleUC: any;
      AuthUC: any;
      user: any;
    }
  }
}

export = Express;
