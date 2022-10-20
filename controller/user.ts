import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import bcrypt from "bcrypt";
import scholarProfile from "../helper/scholarProfile";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'User List'
        #swagger.description = 'User List'
        #swagger.responses[200] = {
          description: 'Successfully get user list',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    const { page, size, filters } = req.query;

    let users = await req.UserUC.allUsers(page, size, filters);

    if (users == null) {
      users = [];
    }

    res.json({
      status: "success",
      total: users.total,
      currentPage: users.currentPage,
      countPage: users.countPage,
      users: users.users,
    });
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'User by id'
        #swagger.description = 'User by id'
        #swagger.responses[200] = {
          description: 'Successfully get user by id',
        }
        #swagger.responses[404] = {
          description: 'User not found',
          schema: {
            status: "error", 
            
            message: "User not found"
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
    const { userId } = req.params;

    let user = await req.UserUC.getUserById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.json({
      status: "success",
      user: user,
    });
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Create User'
        #swagger.description = 'Create User'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create User',
            required: true,
            schema: {
               "name": "Ismail Abdul Rahman",
               "username": "IsmailRahman",
                "email": "ismailar@uthm.edu.my",
                "password": "IsmailRahman22#",
                "roles": [{
                    "role_name": "author"
                }],
                "interests": [{
                    "name": "author"
                }]
            }
              
        },
        #swagger.responses[200] = {
          description: 'Successfully journal',
          schema: [{ $ref: '#/definitions/Journal' }]
        }
        #swagger.responses[404] = {
          description: 'Role not found',
          schema: {
            status: "error", 
            message: "Role not found",
          }
        }
         #swagger.responses[400] = {
          description: 'Username or email not available',
          schema: {
            status: "error", 
            message: "Username or email not available",
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
    const { error } = validation.user(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const roles: any = [];

    for (let i = 0; i < req.body["roles"].length; i++) {
      const check = await req.RoleUC.roleByName(
        req.body["roles"][i]["role_name"]
      );

      if (!check) return next(new ErrorHandler("Role not found", 404));

      roles.push({ id: check["id"] });
    }

    req.body["role"] = roles;

    req.body["password"] = bcrypt.hashSync(req.body["password"], 12);

    let user = await req.UserUC.createUser(req.body);

    if (!user) {
      return next(new ErrorHandler("Username or email not available", 400));
    }

    res.json({
      status: "success",
      user: user,
    });
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Update user by id'
        #swagger.description = 'Update user by id'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create User',
            required: true,
            schema: {
   "salutation": "Dr.",
    "username": "SadiqHussain",
    "name": "Sadiq Hussain",
    "email": "sadiq@dibru.ac.in",
    "roles": [{
        "role_name": "author"
    }],
    "interests": [
        {"name": "Statistical Analysis"},
        {"name": "Computer Aided Instruction"},
        {"name": "Natural Language Processing"},
        {"name": "Data Mining"}
    ]
}
              
        },
        #swagger.responses[200] = {
          description: 'Successfully update user by id',
        }
        #swagger.responses[404] = {
          description: 'User not found',
          schema: {
            status: "error", 
            
            message: "User not found"
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
    const userId = req.params["userId"];

    const { error } = validation.userUpdate({
      username: req.body["username"],
      name: req.body["name"],
      email: req.body["email"],
      roles: req.body["roles"],
      interests: req.body["interests"],
    });

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let checkuser = await req.UserUC.getUserById(userId);

    if (!checkuser) {
      return next(new ErrorHandler("User not found", 404));
    }

    const roles: any = [];

    for (let i = 0; i < req.body["roles"].length; i++) {
      const check = await req.RoleUC.roleByName(
        req.body["roles"][i]["role_name"]
      );

      if (!check) return next(new ErrorHandler("Role not found", 404));

      roles.push({ id: check["id"] });
    }

    req.body["role"] = roles;

    if (
      typeof req.body["password"] != "undefined" &&
      req.body["password"] != null
    ) {
      req.body["password"] = bcrypt.hashSync(req.body["password"], 12);
    }
    await req.UserUC.updateUser(userId, req.body);

    res.json({
      status: "success",
      message: `Successfully updated user`,
    });
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Delete user by id'
        #swagger.description = 'Delete user by id'
        #swagger.responses[200] = {
          description: 'Successfully delete user by id',
          schema: {
            status: "success",
            message: `Successfully deleted user`,
          }
        }
        #swagger.responses[404] = {
          description: 'User not found',
          schema: {
            status: "error", 
            
            message: "User not found"
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
    const userId = req.params["userId"];

    let checkuser = await req.UserUC.getUserById(userId);

    if (!checkuser) {
      return next(new ErrorHandler("User not found", 404));
    }

    await req.UserUC.deleteUser(userId);

    res.json({
      status: "success",
      message: `Successfully deleted user`,
    });
  },

  saveBookmark: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Save Bookmark'
        #swagger.description = 'Save Bookmark'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Save Bookmark',
            required: true,
            schema: {
    "bookmarks": [
        {
            "article_id": "24addc68-fc9d-410e-a1cd-15d03ff7f3f1"
        },
        {
            "article_id": "9b9549d0-99b6-4750-8664-540f63aa0cde"
        }
    ]
}

        }
        #swagger.responses[200] = {
          description: 'Successfully saved bookmark',
          schema: {
            status: "success",
            message: `Successfully saved bookmark`,
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
    if (!req.User) {
      return next(new ErrorHandler("Unauthorized", 401));
    }
    const { error } = validation.bookmarks(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["bookmarks"].map(async (bookmark: []) => {
      await req.UserUC.saveBookmark({
        user_id: req.User["id"],
        article_id: bookmark["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully saved bookmark`,
    });
  },

  deleteBookmark: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Delete Bookmark'
        #swagger.description = 'Delete Bookmark'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Delete Bookmark',
            required: true,
            schema: {
    "bookmarks": [
        {
            "article_id": "24addc68-fc9d-410e-a1cd-15d03ff7f3f1"
        },
        {
            "article_id": "9b9549d0-99b6-4750-8664-540f63aa0cde"
        }
    ]
}

        }
        #swagger.responses[200] = {
          description: 'Successfully deleted bookmark',
          schema: {
            status: "success",
            message: `Successfully deleted bookmark`,
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
    if (!req.User) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const { error } = validation.bookmarks(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["bookmarks"].map(async (bookmark: {}) => {
      await req.UserUC.deleteBookmark({
        user_id: req.User["id"],
        article_id: bookmark["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully deleted bookmark`,
    });
  },

  assignAuthor: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Assign author'
        #swagger.description = 'Assign author'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Assign author',
            required: true,
            schema: {
    "authors": [
        {
            "author_id": "d3752544-899d-4b22-8489-590baed2bf00",
            "article_id": "b368a33e-7ad8-4b85-8607-689077805b48"
        }
    ]
}

        }
        #swagger.responses[200] = {
          description: 'Successfully added author',
          schema: {
            status: "success",
            message: `Successfully added author`,
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
    const { error } = validation.assignAuthor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["authors"].map(async (author: {}) => {
      await req.UserUC.assignAuthor({
        author_id: author["author_id"],
        article_id: author["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully added author`,
    });
  },

  deleteAuthor: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Delete author'
        #swagger.description = 'Delete author'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Delete author',
            required: true,
            schema: {
    "authors": [
        {
            "author_id": "d3752544-899d-4b22-8489-590baed2bf00",
            "article_id": "b368a33e-7ad8-4b85-8607-689077805b48"
        }
    ]
}

        }
        #swagger.responses[200] = {
          description: 'Successfully deleted author',
          schema: {
            status: "success",
      message: `Successfully deleted author`,
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
    const { error } = validation.assignAuthor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["authors"].map(async (author: {}) => {
      await req.UserUC.deleteAuthor({
        author_id: author["author_id"],
        article_id: author["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully deleted author`,
    });
  },

  assignEditor: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Assign Editor'
        #swagger.description = 'Assign Editor'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Assign Editor',
            required: true,
            schema: {
    "editors": [
        {
           "editor_id": "20f11d26-32ba-46cb-bcf5-af5d1f1317c6",
            "journal_id": "d76ccb35-aac1-450a-9b7e-4563fbe7aa3a"
        }
    ]
}

        }
        #swagger.responses[200] = {
          description: 'Successfully added editor',
          schema: {
            status: "success",
      message: `Successfully added editor`,
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
    const { error } = validation.assignEditor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["editors"].map(async (editor: {}) => {
      await req.UserUC.assignEditor({
        editor_id: editor["editor_id"],
        journal_id: editor["journal_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully added editor`,
    });
  },

  deleteEditor: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Delete Editor'
        #swagger.description = 'Delete Editor'
               #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Delete Editor',
            required: true,
            schema: {
    "editors": [
        {
           "editor_id": "20f11d26-32ba-46cb-bcf5-af5d1f1317c6",
            "journal_id": "d76ccb35-aac1-450a-9b7e-4563fbe7aa3a"
        }
    ]
}

        }
        #swagger.responses[200] = {
          description: 'Successfully deleted editor',
          schema: {
            status: "success",
      message: `Successfully deleted editor`,
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
    const { error } = validation.assignEditor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["editors"].map(async (editor: {}) => {
      await req.UserUC.deleteEditor({
        editor_id: editor["editor_id"],
        journal_id: editor["journal_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully deleted editor`,
    });
  },

  synchronizeScholar: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
        #swagger.tags = ['User']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'User synchronize scholar'
        #swagger.description = 'User synchronize scholar'
        #swagger.responses[200] = {
          description: 'Successfully synchronize scholar accound',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    const { scholarId } = req.params;

    const scholar = await scholarProfile.getProfile(scholarId);

    if (scholar != null) {
      await req.UserUC.synchronizeScholar({
        user_id: req.User["id"],
        scholar: scholar,
      });
    }

    res.json({
      status: "success",
      message: `Successfully synchronized scholar`,
    });
  },
};
