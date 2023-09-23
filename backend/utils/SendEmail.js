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

export const sendEmail = async (email, name, password) => {
  // create an email message
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Request for Password Reset",
    text: `Hi ${name} \n\nYou've recently made a request to reset your password on the Techieshop.com \n\nYour new password is ${password} `,
  };

  // send the email message
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};
