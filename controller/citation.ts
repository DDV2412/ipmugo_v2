import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import fs from "fs";
import path from "path";

export default {
  citationExport: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Citation']
        #swagger.summary = 'Citation Export'
        #swagger.description = 'Citation Export'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Citation Export',
            required: true,
            schema: {
              "citations": [
                  {
                      "doi": ""
                  }

              ]
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully Export Citation',
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
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
    /**
        #swagger.tags = ['Citation']
        #swagger.summary = 'Citation Formater'
        #swagger.description = 'Citation Formater'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Citation Formater',
            required: true,
            schema: {
              "doi": "10.11591/ijpeds.v13.i3.pp1295-1304",
              "formatType": "bibtex"
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully Citation Formater',
        }
        #swagger.responses[404] = {
          description: 'Validation error',
          schema: {
            status: "error", 
            
            message: "Lookup failed"
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
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
