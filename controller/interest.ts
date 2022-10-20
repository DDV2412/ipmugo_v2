import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allInterests: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Interest']
        #swagger.summary = 'Interest List'
        #swagger.description = 'Interest List'
        #swagger.responses[200] = {
          description: 'Successfully get interests list',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    let interests = await req.InterestUC.allInterests();

    if (interests == null) {
      interests = [];
    }

    res.json({
      status: "success",
      total: interests.count,
      interests: interests.rows,
    });
  },

  interestById: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Interest']
        #swagger.summary = 'Interest By ID'
        #swagger.description = 'Interest By ID'
        #swagger.responses[200] = {
          description: 'Successfully interest',
        }
        #swagger.responses[404] = {
          description: 'Interest not found',
          schema: {
            status: "error", 
            message: "Interest not found",
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
    const interestId = req.params["interestId"];

    let interest = await req.InterestUC.interestById(interestId);

    if (!interest) {
      return next(new ErrorHandler("Interest not found", 404));
    }

    res.json({
      status: "success",
      interest: interest,
    });
  },
  createInterest: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Interest']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Create interest'
        #swagger.description = 'Create interest'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create interest',
            required: true,
            schema: {
              "name": "2D Material"
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully interest',
          schema: {
            "status": "success",
            "interest": {
                "id": "33c8b0d6-e05a-4137-8919-761c75ac60aa",
                "name": "2D Material",
                "createdAt": "2022-10-14T06:23:16.853Z",
                "updatedAt": "2022-10-14T06:23:16.853Z"
            }        
          }
        }
        #swagger.responses[400] = {
          description: 'Server error',
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
    const { error } = validation.interest(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let interest = await req.InterestUC.createInterest(req.body);

    res.json({
      status: "success",
      interest: interest,
    });
  },
  updateInterest: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Interest']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Update interests by iD'
        #swagger.description = 'Update interests by iD'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Interest',
            required: true,
            schema: {
              "name": "2D Material"
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully interest',
          schema: {
            status: "success",
            message: "Successfully updated interest"
          }
        }
        #swagger.responses[404] = {
          description: 'Interest not found',
          schema: {
            status: "error", 
            message: "Interest not found",
          }
        }
        #swagger.responses[400] = {
          description: 'Server error',
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
    const interestId = req.params["interestId"];

    let checkInterest = await req.InterestUC.interestById(interestId);

    if (!checkInterest) {
      return next(new ErrorHandler("Interest not found", 404));
    }

    const { error } = validation.interest(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.InterestUC.updateInterest(interestId, req.body);

    res.json({
      status: "success",
      message: `Successfully deleted interest`,
    });
  },
  deleteInterest: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Interest']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Interest By ID'
        #swagger.description = 'Interest By ID'
        #swagger.responses[200] = {
          description: 'Successfully interest',
          schema: {
            status: "success",
            message: "Successfully deleted interest"
          }
        }
        #swagger.responses[404] = {
          description: 'Interest not found',
          schema: {
            status: "error", 
            message: "Interest not found",
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
    const interestId = req.params["interestId"];

    let checkInterest = await req.InterestUC.interestById(interestId);

    if (!checkInterest) {
      return next(new ErrorHandler("Interest not found", 404));
    }

    await req.InterestUC.deleteInterest(interestId);

    res.json({
      status: "success",
      message: `Successfully deleted interest`,
    });
  },
};
