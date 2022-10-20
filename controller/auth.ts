import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import { mailService } from "../lib/nodemailer";
import jwt from "jsonwebtoken";

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Login'
        #swagger.description = 'Authentication Login'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication Login',
            required: true,
            schema: {
              $ref: '#/definitions/Login'
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully login',
          schema: {
                    "status": "success",
                    "user": {
                        "id": "9f385ea6-3414-4b48-994b-cb5db0808521",
                        "salutation": null,
                        "username": "DDV2412",
                        "name": "Dian Dwi Vaputra",
                        "photo_profile": null,
                        "password": "$2a$12$6a5ihAeMs2mrY/wjLsDHHOmdBEv6cbSwdVZwHFfYCmLR.hjP7a0Mq",
                        "orcid": null,
                        "biograph": null,
                        "affiliation": null,
                        "verified": null,
                        "roles": [
                            {
                                "id": "5f7087f2-ee2c-4fd8-844e-3c7578d6bd1b",
                                "role_name": "admin",
                                "user_roles": {
                                    "user_id": "9f385ea6-3414-4b48-994b-cb5db0808521",
                                    "role_id": "5f7087f2-ee2c-4fd8-844e-3c7578d6bd1b"
                                }
                            }
                        ]
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOWYzODVlYTYtMzQxNC00YjQ4LTk5NGItY2I1ZGIwODA4NTIxIiwic2FsdXRhdGlvbiI6bnVsbCwidXNlcm5hbWUiOiJERFYyNDEyIiwibmFtZSI6IkRpYW4gRHdpIFZhcHV0cmEiLCJwaG90b19wcm9maWxlIjpudWxsLCJwYXNzd29yZCI6IiQyYSQxMiQ2YTVpaEFlTXMybXJZL3dqTHNESEhPbWRCRXY2Y2JTd2RWWndIRmZZQ21MUi5oalA3YTBNcSIsIm9yY2lkIjpudWxsLCJiaW9ncmFwaCI6bnVsbCwiYWZmaWxpYXRpb24iOm51bGwsInZlcmlmaWVkIjpudWxsLCJyb2xlcyI6W3siaWQiOiI1ZjcwODdmMi1lZTJjLTRmZDgtODQ0ZS0zYzc1NzhkNmJkMWIiLCJyb2xlX25hbWUiOiJhZG1pbiIsInVzZXJfcm9sZXMiOnsidXNlcl9pZCI6IjlmMzg1ZWE2LTM0MTQtNGI0OC05OTRiLWNiNWRiMDgwODUyMSIsInJvbGVfaWQiOiI1ZjcwODdmMi1lZTJjLTRmZDgtODQ0ZS0zYzc1NzhkNmJkMWIifX1dfSwiaWF0IjoxNjY2MjM0NzQ0LCJleHAiOjE2NjYyMzgzNDR9.gYDCdwLigHtrKKnLkLkTKhZdKnIvunrrG_fuAZcDlEo"
                }
        }
        #swagger.responses[403] = {
          description: 'Incorrect username or password',
          schema: {
            status: "error", 
            message: "Incorrect username or password",
          }
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
    const { error } = validation.login(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let user = await req.AuthUC.login(req.body);

    if (!user) {
      return next(new ErrorHandler("Incorrect username or password", 403));
    }

    res.json({
      status: "success",
      user: user["user"],
      token: user["token"],
    });
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Register'
        #swagger.description = 'Authentication Register'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication Register',
            required: true,
            schema: {
              $ref: '#/definitions/Register'
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully register',
          schema: {
                    "status": "success",
                    "user": {
                        "id": "9f385ea6-3414-4b48-994b-cb5db0808521",
                        "salutation": null,
                        "username": "DDV2412",
                        "name": "Dian Dwi Vaputra",
                        "photo_profile": null,
                        "password": "$2a$12$6a5ihAeMs2mrY/wjLsDHHOmdBEv6cbSwdVZwHFfYCmLR.hjP7a0Mq",
                        "orcid": null,
                        "biograph": null,
                        "affiliation": null,
                        "verified": null,
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOWYzODVlYTYtMzQxNC00YjQ4LTk5NGItY2I1ZGIwODA4NTIxIiwic2FsdXRhdGlvbiI6bnVsbCwidXNlcm5hbWUiOiJERFYyNDEyIiwibmFtZSI6IkRpYW4gRHdpIFZhcHV0cmEiLCJwaG90b19wcm9maWxlIjpudWxsLCJwYXNzd29yZCI6IiQyYSQxMiQ2YTVpaEFlTXMybXJZL3dqTHNESEhPbWRCRXY2Y2JTd2RWWndIRmZZQ21MUi5oalA3YTBNcSIsIm9yY2lkIjpudWxsLCJiaW9ncmFwaCI6bnVsbCwiYWZmaWxpYXRpb24iOm51bGwsInZlcmlmaWVkIjpudWxsLCJyb2xlcyI6W3siaWQiOiI1ZjcwODdmMi1lZTJjLTRmZDgtODQ0ZS0zYzc1NzhkNmJkMWIiLCJyb2xlX25hbWUiOiJhZG1pbiIsInVzZXJfcm9sZXMiOnsidXNlcl9pZCI6IjlmMzg1ZWE2LTM0MTQtNGI0OC05OTRiLWNiNWRiMDgwODUyMSIsInJvbGVfaWQiOiI1ZjcwODdmMi1lZTJjLTRmZDgtODQ0ZS0zYzc1NzhkNmJkMWIifX1dfSwiaWF0IjoxNjY2MjM0NzQ0LCJleHAiOjE2NjYyMzgzNDR9.gYDCdwLigHtrKKnLkLkTKhZdKnIvunrrG_fuAZcDlEo"
                }
        }
        #swagger.responses[403] = {
          description: 'Email or username not available',
          schema: {
            status: "error", 
            message: "Email or username not available",
          }
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
    const { error } = validation.register(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let user = await req.AuthUC.register(req.body);

    if (!user) {
      return next(new ErrorHandler("Email or username not available", 403));
    }

    res.json({
      status: "success",
      user: user["user"],
      token: user["token"],
    });
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Forgot Password'
        #swagger.description = 'Authentication Forgot Password'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication Forgot Password',
            required: true,
            schema: {
              "email": "dhyanputra24@gmail.com",
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully send mail',
          schema: {
                    "status": "success",
                    "message": "Email sent to EMAIL successfully",
                }
        }
        #swagger.responses[403] = {
          description: 'Email not available',
          schema: {
            status: "error", 
            message: "Email not available",
          }
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
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const checkEmail = await req.UserUC.getUserByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new ErrorHandler("Email not available", 403));
    }

    let reset = await req.AuthUC.forgotPassword(req.body["email"]);

    if (reset == null) {
      return next(new ErrorHandler("Email not available", 403));
    }

    await mailService({
      to: req.body["email"],
      subject: `Password Reset Request for IPMUGO Digital Library`,
      message:
        "To reset your password, please click the link below.\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "\n" +
        "/api/reset-password?token=" +
        encodeURIComponent(reset) +
        "&email=" +
        req.body["email"],
    });

    res.json({
      status: "success",
      message: `Email sent to ${req.body.email} successfully`,
    });
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Reset Password'
        #swagger.description = 'Authentication Reset Password'
        #swagger.parameters['email'] = {
            in: 'query',
            description: 'Authentication Reset Password',
            required: true,
            schema: {
              "email": "dhyanputra24@gmail.com",
            }
          },
          #swagger.parameters['token'] = {
            in: 'query',
            description: 'Authentication Reset Password',
            required: true,
            schema: {
              "token": "token",
            }
          },
            #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication New Password',
            required: true,
            schema: {
              "password": "pass",
              "confirmPassword": "pass",
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully reset password',
          schema: {
                    "status": "success",
                    "message": "Password reset. Please login with your new password.",
                }
        }
        #swagger.responses[400] = {
          description: 'Token has expired. Please try password reset again.',
          schema: {
            status: "error", 
            message: "Token has expired. Please try password reset again."
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
    const { token, email } = req.query;

    const { error } = validation.resetPassword(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    if (req.body["password"] !== req.body["confirmPassword"]) {
      return next(new ErrorHandler("Password not match", 400));
    }

    let reset = await req.AuthUC.resetPassword(
      token,
      email,
      req.body["password"]
    );

    if (reset == null) {
      return next(
        new ErrorHandler(
          "Token has expired. Please try password reset again.",
          400
        )
      );
    }

    await mailService({
      to: req.query.email,
      subject: `IPMUGO Digital Library Password Changed`,
      message: `We've channeled our psionic energy to change your Discord account password. Gonna go get a seltzer to calm down.`,
    });

    res.json({
      status: "success",
      message: `Password reset. Please login with your new password.`,
    });
  },

  requestEmailVerify: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Request Verify'
        #swagger.description = 'Authentication Request Verify'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication Request Verify',
            required: true,
            schema: {
              "email": "dhyanputra24@gmail.com",
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully send mail',
          schema: {
                    "status": "success",
                    "message": "Email sent to EMAIL successfully",
                }
        }
        #swagger.responses[403] = {
          description: 'Email not available',
          schema: {
            status: "error", 
            message: "Email not available",
          }
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
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const checkEmail = await req.UserUC.getUserByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new ErrorHandler("Email not available", 403));
    }

    const verifyToken = await jwt.sign(
      {
        email: req.body.email,
      },
      String(process.env.JWT_SECRET),
      { expiresIn: "15m" }
    );

    await mailService({
      to: req.body.email,
      replyTo: process.env.SMTP_ADDRESS,
      subject: `IPMUGO Digital Library Verification Email`,
      message:
        "To verification email, please click the link below.\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "\n" +
        "/api/verify-email?token=" +
        verifyToken,
    });

    res.json({
      status: "success",
      message: `Email sent to ${req.body.email} successfully`,
    });
  },

  emailVerify: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Verify Email'
        #swagger.description = 'Authentication Verify Email'
        #swagger.responses[200] = {
          description: 'Successfully verify email',
          schema: {
                    "status": "success",
                    "message": "Email verified successfully",
                }
        }
        #swagger.responses[403] = {
          description: 'Cannot verify this email, try again.',
          schema: {
            status: "error", 
            message: "Cannot verify this email, try again"
          }
        }
         #swagger.responses[400] = {
          description: 'Token expired.',
          schema: {
            status: "error", 
            message: "Token expired."
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
    const { token } = req.query;

    const decodedData = await jwt.verify(
      String(token),
      String(process.env.JWT_SECRET)
    );

    if (Date.now() > decodedData["exp"] * 1000)
      return next(new ErrorHandler("Token expired", 400));

    const user = await req.UserUC.getUserByEmail(decodedData["email"]);

    if (!user)
      return next(new ErrorHandler("Cannot verify this email, try again", 403));

    const update = await req.AuthUC.emailVerify(user.email);

    if (update == null) {
      return next(new ErrorHandler("Cannot verify this email, try again", 403));
    }

    res.json({
      status: "success",
      message: "Email verified successfully",
    });
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'User Update Profile'
        #swagger.description = 'User Update Profile'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User Update Profile',
            required: true,
            schema: {
              $ref: '#/definitions/User'
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully update password',
          schema: {
                    "status": "success",
                     message: "Profile updated successfully",
                }
        }
        #swagger.responses[400] = {
          description: 'Server error',
          schema: {
           status: "error",         
            message: "____"
          }
        }
        #swagger.responses[501] = {
          description: 'Server not response',
          schema: {
           status: "error",         
            message: "____"
          }
        }
       
       */
    const user = await req.UserUC.userByUsername(req.User.username);

    if (!user) {
      return next(new ErrorHandler("Server not response", 501));
    }

    await req.AuthUC.updateProfile(req.User.username, req.body);

    res.json({
      status: "success",
      message: `Profile updated successfully`,
    });
  },

  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'User Update Password'
        #swagger.description = 'User Update Password'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User Update Password',
            required: true,
            schema: {
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully update password',
          schema: {
                    "status": "success",
                     message: "Password updated successfully",
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
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const { error } = validation.updatePassword(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const user = await req.UserUC.userByUsername(req.User.username);

    if (!user) {
      return next(new ErrorHandler("Server not response", 501));
    }

    if (currentPassword !== confirmPassword) {
      return next(new ErrorHandler("Password not match", 400));
    }

    if (req.body["currentPassword"] == req.body["newPassword"]) {
      return next(new ErrorHandler("Password not available", 400));
    }

    await req.AuthUC.updatePassword({
      email: user["email"],
      password: newPassword,
    });

    res.json({
      status: "success",
      message: `Password updated successfully`,
    });
  },
  deleteProfile: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'User Delete Profile'
        #swagger.description = 'User Delete Profile'
        #swagger.responses[200] = {
          description: 'Successfully delete account',
          schema: {
                    "status": "success",
                     message: "Account deleted successfully",
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
    await req.AuthUC.deleteProfile(req.User["id"]);

    res.json({
      status: "success",
      message: `Account deleted successfully`,
    });
  },

  loginGoogle: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Authentication Login Google'
        #swagger.description = 'Authentication Login Google'
        #swagger.responses[200] = {
          description: 'Successfully login',
          schema: {
                    "status": "success",
                    "user": {
                        "id": "9f385ea6-3414-4b48-994b-cb5db0808521",
                        "salutation": null,
                        "username": "DDV2412",
                        "name": "Dian Dwi Vaputra",
                        "photo_profile": null,
                        "password": "$2a$12$6a5ihAeMs2mrY/wjLsDHHOmdBEv6cbSwdVZwHFfYCmLR.hjP7a0Mq",
                        "orcid": null,
                        "biograph": null,
                        "affiliation": null,
                        "verified": null,
                        "roles": [
                            {
                                "id": "5f7087f2-ee2c-4fd8-844e-3c7578d6bd1b",
                                "role_name": "admin",
                                "user_roles": {
                                    "user_id": "9f385ea6-3414-4b48-994b-cb5db0808521",
                                    "role_id": "5f7087f2-ee2c-4fd8-844e-3c7578d6bd1b"
                                }
                            }
                        ]
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOWYzODVlYTYtMzQxNC00YjQ4LTk5NGItY2I1ZGIwODA4NTIxIiwic2FsdXRhdGlvbiI6bnVsbCwidXNlcm5hbWUiOiJERFYyNDEyIiwibmFtZSI6IkRpYW4gRHdpIFZhcHV0cmEiLCJwaG90b19wcm9maWxlIjpudWxsLCJwYXNzd29yZCI6IiQyYSQxMiQ2YTVpaEFlTXMybXJZL3dqTHNESEhPbWRCRXY2Y2JTd2RWWndIRmZZQ21MUi5oalA3YTBNcSIsIm9yY2lkIjpudWxsLCJiaW9ncmFwaCI6bnVsbCwiYWZmaWxpYXRpb24iOm51bGwsInZlcmlmaWVkIjpudWxsLCJyb2xlcyI6W3siaWQiOiI1ZjcwODdmMi1lZTJjLTRmZDgtODQ0ZS0zYzc1NzhkNmJkMWIiLCJyb2xlX25hbWUiOiJhZG1pbiIsInVzZXJfcm9sZXMiOnsidXNlcl9pZCI6IjlmMzg1ZWE2LTM0MTQtNGI0OC05OTRiLWNiNWRiMDgwODUyMSIsInJvbGVfaWQiOiI1ZjcwODdmMi1lZTJjLTRmZDgtODQ0ZS0zYzc1NzhkNmJkMWIifX1dfSwiaWF0IjoxNjY2MjM0NzQ0LCJleHAiOjE2NjYyMzgzNDR9.gYDCdwLigHtrKKnLkLkTKhZdKnIvunrrG_fuAZcDlEo"
                }
        }
        #swagger.responses[403] = {
          description: 'Incorrect username or password',
          schema: {
            status: "error", 
            message: "Incorrect username or password",
          }
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
    let user = await req.AuthUC.loginGoogle(req.User);

    if (!user) {
      return next(new ErrorHandler("Incorrect username or password", 403));
    }

    res.json({
      status: "success",
      user: user["user"],
      token: user["token"],
    });
  },
};
