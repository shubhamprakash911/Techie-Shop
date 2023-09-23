import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (email, password) => {
  // create an email message
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Forgot Password: Your New Password for Techieshop",
    text: `This is your new password: ${password} \nPlease used this password to login with TechieShop.com`,
  };

  // send the email message
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};
