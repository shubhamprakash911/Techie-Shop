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
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/logout", logoutUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.route("/profile").get(getUserProfile).put(updateUserProfile);

userRouter.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default userRouter;
