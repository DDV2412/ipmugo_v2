import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allRoles: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Role']
         #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Role List'
        #swagger.description = 'Role List'
        #swagger.responses[200] = {
          description: 'Successfully get role list',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    let roles = await req.RoleUC.allRoles();

    if (roles == null) {
      roles = [];
    }

    res.json({
      status: "success",
      total: roles.count,
      roles: roles.rows,
    });
  },

  roleByName: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Role']
         #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Get Role by name'
        #swagger.description = 'Get Role by name'
        #swagger.responses[200] = {
          description: 'Successfully get role by name',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    const { roleName } = req.params;

    let role = await req.RoleUC.roleByName(roleName);

    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }

    res.json({
      status: "success",
      role: role,
    });
  },

  createRole: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Role']
         #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Create Role'
        #swagger.description = 'Create Role'
         #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Role',
            required: true,
            schema: {
              role_name: "admin"
            }
          }
        #swagger.responses[200] = {
          description: 'Successfully create role',
          schema: {
              role_name: "admin"
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
    const { error } = validation.role(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let role = await req.RoleUC.createRole(req.body);

    res.json({
      status: "success",
      role: role,
    });
  },
  updateRole: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Role']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Update Role'
        #swagger.description = 'Update Role'
         #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Role',
            required: true,
            schema: {
              role_name: "admin"
            }
          }
        #swagger.responses[200] = {
          description: 'Successfully updated role',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    const { roleName } = req.params;

    let checkrole = await req.RoleUC.roleByName(roleName);

    if (!checkrole) {
      return next(new ErrorHandler("Role not found", 404));
    }

    const { error } = validation.role(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.RoleUC.updateRole(roleName, req.body);

    res.json({
      status: "success",
      message: `Successfully updated role`,
    });
  },
  deleteRole: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Role']
       #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Delete Role'
        #swagger.description = 'Delete Role'
        #swagger.responses[200] = {
          description: 'Successfully deleted role',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    const { roleName } = req.params;

    let checkrole = await req.RoleUC.roleByName(roleName);

    if (!checkrole) {
      return next(new ErrorHandler("Role not found", 404));
    }

    await req.RoleUC.deleteRole(roleName);

    res.json({
      status: "success",
      message: `Successfully deleted role`,
    });
  },
};
