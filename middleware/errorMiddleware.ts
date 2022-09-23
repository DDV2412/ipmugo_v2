import { NextFunction, Request, Response } from "express";
const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal server error";

  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};

export default errorMiddleware;
