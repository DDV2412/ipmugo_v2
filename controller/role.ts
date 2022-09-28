import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allRoles: async (req: Request, res: Response, next: NextFunction) => {
    let roles = await req.RoleUC.allRoles();

    if (roles == null) {
      roles = [];
    }

    res.status(200).json({
      status: "success",
      total: roles.count,
      roles: roles.rows,
    });
  },

  roleByName: async (req: Request, res: Response, next: NextFunction) => {
    const { roleName } = req.params;

    let role = await req.RoleUC.roleByName(roleName);

    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }

    res.status(200).json({
      status: "success",
      role: role,
    });
  },

  createRole: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.role(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let role = await req.RoleUC.createRole(req.body);

    res.status(201).json({
      status: "success",
      role: role,
    });
  },
  updateRole: async (req: Request, res: Response, next: NextFunction) => {
    const { roleName } = req.params;

    let checkrole = await req.RoleUC.roleByName(roleName);

    if (!checkrole) {
      return next(new ErrorHandler("Role not found", 404));
    }

    const { error } = validation.role(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.RoleUC.updateRole(checkrole["id"], req.body);

    res.status(200).json({
      status: "success",
      message: `Successfully updated role ${checkrole["role_name"]}`,
    });
  },
  deleteRole: async (req: Request, res: Response, next: NextFunction) => {
    const { roleName } = req.params;

    let checkrole = await req.RoleUC.roleByName(roleName);

    if (!checkrole) {
      return next(new ErrorHandler("Role not found", 404));
    }

    await req.RoleUC.deleteRole(checkrole["id"]);

    res.status(200).json({
      status: "success",
      message: `Successfully deleted role ${checkrole["role_name"]}`,
    });
  },
};
