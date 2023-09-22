import jwt from "jsonwebtoken";
import sendToken from "./sendToken.js";

const generateToken = (res, userId, option) => {
  if (option === "access") {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const maxAgeInMillisecond = 1000 * 60 * 60 * 24;
    24 * sendToken(res, maxAgeInMillisecond, option, token);
  } else if (option === "refresh") {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const maxAgeInMillisecond = 1000 * 60 * 60 * 24 * 7;
    sendToken(res, maxAgeInMillisecond, option, token);
  }
};

export default generateToken;
