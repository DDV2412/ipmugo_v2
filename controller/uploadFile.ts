import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import path from "path";

export default {
  fileUpload: async (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.file == undefined || req.file == null) {
      return next(new ErrorHandler("No file uploaded", 400));
    }

    let file = {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path.replace(
        path.join(__dirname, "/../static"),
        `${req.protocol}://${req.get("host")}`
      ),
      size: req.file.size,
    };

    res.json({
      success: true,
      status: 200,
      file: file,
    });
  },
};
