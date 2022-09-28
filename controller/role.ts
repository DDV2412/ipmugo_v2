import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let roles = await req.RoleUC.allRoles();

      if (roles == null) {
        roles = [];
      }

      res.status(200).json({
        status: "success",
        total: roles.count,
        roles: roles.rows,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  roleByName: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roleName } = req.params;

      let role = await req.RoleUC.roleByName(roleName);

      if (!role) {
        return next(new ErrorHandler("Role not found", 404));
      }

      res.status(200).json({
        status: "success",
        role: role,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  createRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.role(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let role = await req.RoleUC.createRole(req.body);

      res.status(201).json({
        status: "success",
        role: role,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  updateRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roleName } = req.params;

      let checkrole = await req.RoleUC.roleByName(roleName);

      if (!checkrole) {
        return next(new ErrorHandler("Role not found", 404));
      }

      const { error } = validation.role(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let role = await req.RoleUC.updateRole(checkrole, req.body);

      res.status(200).json({
        status: "success",
        role: role,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  deleteRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roleName } = req.params;

      let checkrole = await req.RoleUC.roleByName(roleName);

      if (!checkrole) {
        return next(new ErrorHandler("Role not found", 404));
      }

      await req.RoleUC.deleteRole(checkrole);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted role ${checkrole["role_name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
