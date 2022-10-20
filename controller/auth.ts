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
      to: checkEmail["name"] + "<" + req.body.email + ">",
      subject: `Password Reset Request for IPMUGO Digital Library`,
      text:
        "We have received your request to reset your password. Please click the link below to complete the reset:\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "/api/reset-password?token=" +
        encodeURIComponent(reset) +
        "&email=" +
        req.body["email"],
      message: `<tbody>
  <tr>
    <td width="100%" valign="top" bgcolor="#ffffff" style="padding-top: 20px">
      <table
        width="580"
        class="m_-5695989656555827937deviceWidth"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="center"
        bgcolor="#ffffff"
        style="border-collapse: collapse; margin: 0 auto"
      >
        <tbody>
          <tr>
            <td
              valign="top"
              align="center"
              style="padding: 0"
              bgcolor="#ffffff"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="width: 100px; color: #1d4ed8"
                viewBox="0 0 125.533 64.114"
                fill="currentColor"
              >
                <g transform="translate(-1927 -2183.497)">
                  <path
                    d="M1983.683,2198.985c-30.6,21.63-29.659,57.937-56.683,63.141C1950.136,2237.045,1956.845,2198.734,1983.683,2198.985Z"
                    transform="translate(0 -14.515)"
                  ></path>
                  <path
                    d="M2433.341,2192.369c-21.381,21.632-23.452,50.6-47.341,55.241,18.121-19.626,26.146-47.34,41.634-58.376,22.448-15.925,54.99,3.449,32.6,31.791l-9.217-1C2467.764,2203.782,2451.462,2174.123,2433.341,2192.369Z"
                    transform="translate(-430.22)"
                  ></path>
                  <path
                    d="M3141.716,2352c-.689,6.02-5.456,47.968-17.055,44.519-3.95-1.191-6.646-7.336-3.825-12.792l-9.908-1.316L3094,2402.6l11.161.689,7.147-9.28c23.075,14.735,33.734-1.818,34.047-21.068C3146.481,2365.983,3143.536,2358.207,3141.716,2352Z"
                    transform="translate(-1093.827 -157.938)"
                  ></path>
                </g>
              </svg>
            </td>
          </tr>
          <tr>
            <td
              style="
                font-size: 13px;
                color: #282828;
                font-weight: normal;
                text-align: left;
                font-family: 'Open Sans', sans-serif;
                line-height: 24px;
                vertical-align: top;
                padding: 15px 8px 10px 8px;
              "
              bgcolor="#ffffff"
            >
              <h1
                style="
                  text-align: center;
                  font-weight: 600;
                  margin: 30px 0 50px 0;
                "
              >
                PASSWORD RESET REQUEST
              </h1>
              <p>Dear ${checkEmail["name"]},</p>
              <p>
                We have received your request to reset your password. Please
                click the link below to complete the reset:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 30px">
              <a
                href="${req.protocol}://${req.get(
        "host"
      )}/api/reset-password?token=${encodeURIComponent(reset)}&email=${
        req.body["email"]
      }"
                style="
                  padding: 10px;
                  width: 300px;
                  display: block;
                  text-decoration: none;
                  border: 1px solid #ff6c37;
                  text-align: center;
                  font-weight: bold;
                  font-size: 14px;
                  font-family: 'Open Sans', sans-serif;
                  color: #ffffff;
                  background: #ff6c37;
                  border-radius: 5px;
                  line-height: 17px;
                  margin: 0 auto;
                "
                target="_blank"
                data-saferedirecturl="#"
              >
                Reset My Password
              </a>
            </td>
          </tr>
          <tr>
            <td
              style="
                font-family: 'Open Sans', sans-serif;
                font-size: 13px;
                padding: 0px 10px 0px 10px;
                text-align: left;
              "
            >
              <p>
                If you need additional assistance, or you did not make this
                change, please contact
                <a
                  href="mailto:help@ipmugo.com"
                  style="
                    color: #ff6c37;
                    text-decoration: underline;
                    font-weight: bold;
                  "
                  target="_blank"
                  >help@ipmugo.com</a
                >.
              </p>
              <p>Cheers,<br />The IPMUGo Team</p>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
<table
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  style="border-collapse: collapse; margin: 0 auto"
>
  <tbody>
    <tr>
      <td
        bgcolor="#ffffff"
        style="
          font-family: 'Open Sans', sans-serif;
          line-height: 150%;
          padding-top: 10px;
          padding-left: 10px;
          padding-right: 18px;
          padding-bottom: 30px;
          text-align: left;
          border-bottom: 0;
          font-size: 10px;
          border-top: 0;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          align="left"
          style="border-collapse: collapse"
        >
          <tbody>
            <tr>
              <td
                valign="top"
                style="
                  text-align: center;
                  font-size: 11px;
                  color: #282828;
                  font-family: 'Open Sans', sans-serif;
                  padding: 20px 0;
                  padding-left: 0px;
                "
              >
                This email was sent to
                <a href="${req.body["email"]}"
                  style="
                    color: #ff6c37;
                    text-decoration: none;
                    font-weight: 600;
                  "
                  >${req.body["email"]}</a
                >, which is associated with an IPMUGo account. <br />
                <br />
                © ${new Date().getFullYear()} PT IPMU, All Rights Reserved<br />
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
`,
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
          },
          #swagger.parameters['token'] = {
            in: 'query',
            description: 'Authentication Reset Password',
            required: true,
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
      to: checkEmail["name"] + "<" + req.body.email + ">",
      replyTo: process.env.SMTP_ADDRESS,
      subject: `IPMUGO Digital Library Verification Email`,
      text:
        "Thank you for registering. To activate your account please click this email verification link:.\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "/api/verify-email?token=" +
        verifyToken,
      message: `<tbody>
  <tr>
    <td width="100%" valign="top" bgcolor="#ffffff" style="padding-top: 20px">
      <table
        width="580"
        class="m_-5695989656555827937deviceWidth"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="center"
        bgcolor="#ffffff"
        style="border-collapse: collapse; margin: 0 auto"
      >
        <tbody>
          <tr>
            <td
              valign="top"
              align="center"
              style="padding: 0"
              bgcolor="#ffffff"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="width: 100px; color: #1d4ed8"
                viewBox="0 0 125.533 64.114"
                fill="currentColor"
              >
                <g transform="translate(-1927 -2183.497)">
                  <path
                    d="M1983.683,2198.985c-30.6,21.63-29.659,57.937-56.683,63.141C1950.136,2237.045,1956.845,2198.734,1983.683,2198.985Z"
                    transform="translate(0 -14.515)"
                  ></path>
                  <path
                    d="M2433.341,2192.369c-21.381,21.632-23.452,50.6-47.341,55.241,18.121-19.626,26.146-47.34,41.634-58.376,22.448-15.925,54.99,3.449,32.6,31.791l-9.217-1C2467.764,2203.782,2451.462,2174.123,2433.341,2192.369Z"
                    transform="translate(-430.22)"
                  ></path>
                  <path
                    d="M3141.716,2352c-.689,6.02-5.456,47.968-17.055,44.519-3.95-1.191-6.646-7.336-3.825-12.792l-9.908-1.316L3094,2402.6l11.161.689,7.147-9.28c23.075,14.735,33.734-1.818,34.047-21.068C3146.481,2365.983,3143.536,2358.207,3141.716,2352Z"
                    transform="translate(-1093.827 -157.938)"
                  ></path>
                </g>
              </svg>
            </td>
          </tr>
          <tr>
            <td
              style="
                font-size: 13px;
                color: #282828;
                font-weight: normal;
                text-align: left;
                font-family: 'Open Sans', sans-serif;
                line-height: 24px;
                vertical-align: top;
                padding: 15px 8px 10px 8px;
              "
              bgcolor="#ffffff"
            >
              <h1
                style="
                  text-align: center;
                  font-weight: 600;
                  margin: 30px 0 50px 0;
                "
              >
                WELCOME TO IPMUGO
              </h1>
              <p>Dear ${checkEmail["name"]},</p>
              <p>
                Thank you for registering. To activate your account please click
                this email verification link:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 30px">
              <a
                href="${req.protocol}://${req.get(
        "host"
      )}/api/verify-email?token=${verifyToken}" style="
                  padding: 10px;
                  width: 300px;
                  display: block;
                  text-decoration: none;
                  border: 1px solid #ff6c37;
                  text-align: center;
                  font-weight: bold;
                  font-size: 14px;
                  font-family: 'Open Sans', sans-serif;
                  color: #ffffff;
                  background: #ff6c37;
                  border-radius: 5px;
                  line-height: 17px;
                  margin: 0 auto;
                "
                target="_blank"
                data-saferedirecturl="#"
              >
                Verify Email
              </a>
            </td>
          </tr>
          <tr>
            <td
              style="
                font-family: 'Open Sans', sans-serif;
                font-size: 13px;
                padding: 0px 10px 0px 10px;
                text-align: left;
              "
            >
              <p>
                If you need additional assistance, or you did not make this
                change, please contact
                <a
                  href="mailto:help@ipmugo.com"
                  style="
                    color: #ff6c37;
                    text-decoration: underline;
                    font-weight: bold;
                  "
                  target="_blank"
                  >help@ipmugo.com</a
                >.
              </p>
              <p>Cheers,<br />The IPMUGo Team</p>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
<table
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  style="border-collapse: collapse; margin: 0 auto"
>
  <tbody>
    <tr>
      <td
        bgcolor="#ffffff"
        style="
          font-family: 'Open Sans', sans-serif;
          line-height: 150%;
          padding-top: 10px;
          padding-left: 10px;
          padding-right: 18px;
          padding-bottom: 30px;
          text-align: left;
          border-bottom: 0;
          font-size: 10px;
          border-top: 0;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          align="left"
          style="border-collapse: collapse"
        >
          <tbody>
            <tr>
              <td
                valign="top"
                style="
                  text-align: center;
                  font-size: 11px;
                  color: #282828;
                  font-family: 'Open Sans', sans-serif;
                  padding: 20px 0;
                  padding-left: 0px;
                "
              >
                This email was sent to
                <a href="${req.body.email}"
                  style="
                    color: #ff6c37;
                    text-decoration: none;
                    font-weight: 600;
                  "
                  >${req.body.email}</a
                >, which is associated with an IPMUGo account. <br />
                <br />
                © ${new Date().getFullYear()} PT IPMU, All Rights Reserved<br />
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
`,
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
