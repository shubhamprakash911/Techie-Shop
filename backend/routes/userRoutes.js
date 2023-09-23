import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
  refreshAccessToken,
  forgetPassword,
} from "../controllers/userController.js";
import { admin, authenticate } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, admin, getUsers);
userRouter.post("/logout", logoutUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh", refreshAccessToken);
userRouter.put("/forgotPassword", forgetPassword);
userRouter
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

userRouter
  .route("/:id")
  .delete(authenticate, admin, deleteUser)
  .get(authenticate, admin, getUserById)
  .put(authenticate, admin, updateUser);

export default userRouter;
