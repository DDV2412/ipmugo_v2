import multer from "multer";
import { Express, Request } from "express";
import path from "path";
import fs from "fs";

const storageDestination = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: any) => {
    if (
      !fs.existsSync(
        path.join(__dirname + "/../static/" + req.params["pathName"])
      )
    ) {
      fs.mkdirSync(
        path.join(__dirname + "/../static/" + req.params["pathName"])
      );
    }
    callback(
      null,
      path.join(__dirname + "/../static/" + req.params["pathName"])
    );
  },
  filename: (req: Request, file: Express.Multer.File, callback: any) => {
    callback(null, file.originalname);
  },
});
const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export default { storageDestination, fileFilter };
