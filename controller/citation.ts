import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import fs from "fs";
import path from "path";

export default {
  citationExport: async (req: Request, res: Response, next: NextFunction) => {
    if (
      fs.existsSync(path.join(__dirname, "/../static/exported/bibExport.bib"))
    ) {
      fs.truncateSync(
        path.join(__dirname, "/../static/exported/bibExport.bib")
      );
    }

    const { error } = validation.citations(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    for await (const cite of req.body["citations"]) {
      const data = await req.CitationUC.citationExport(cite["doi"]);

      fs.appendFileSync(
        path.join(__dirname, "/../static/exported/bibExport.bib"),
        data
      );
    }

    res.sendFile(path.join(__dirname, "/../static/exported/bibExport.bib"));
  },
  citationFormater: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.citationFormater(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const cite = await req.CitationUC.citationFormater(req.body);

    if (cite == null) {
      return next(new ErrorHandler("Lookup failed", 404));
    }

    res.json({
      success: true,
      citationFormat: cite,
    });
  },
};
