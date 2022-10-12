import nodeMailer from "nodemailer";

export const mailService = async (options: any) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: `IPMUGO Digital Library` + `<` + process.env.SMTP_ADDRESS + `>`,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
