import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import { mailService } from "../lib/nodemailer";
import jwt from "jsonwebtoken";

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
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
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const { error } = validation.updatePassword(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const user = await req.UserUC.userByUsername(req.User.username);

    if (!user) {
      return next(new ErrorHandler("Server not response", 501));
    }

    if (req.body["newPassword"] !== req.body["confirmPassword"]) {
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
  deleteProfile: async (req: Request, res: Response, next: NextFunction) => {},

  loginGoogle: async (req: Request, res: Response, next: NextFunction) => {
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
