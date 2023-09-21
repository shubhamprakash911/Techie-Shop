import jwt from "jsonwebtoken";
import sendToken from "./sendToken.js";

const generateToken = (res, userId, option) => {
  if (option === "access") {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    sendToken(res, 1, option, token);
  } else if (option === "refresh") {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "3m",
    });
    sendToken(res, 3, option, token);
  }
};

export default generateToken;
