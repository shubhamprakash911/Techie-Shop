import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// User must be authenticated
const authenticate = asyncHandler(async (req, res, next) => {
  // Read JWT from the 'jwt' cookie
  const { accessToken } = req.cookies;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { authenticate, admin };
