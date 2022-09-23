declare global {
  namespace Express {
    export interface Request {
      uc: any;
    }
  }
}

export = Express;
