import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/SendEmail.js";
import { generatePassword } from "../utils/generatePassword.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Email not found, Please register first");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, "access");
    generateToken(res, user._id, "refresh");

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id, "access");
    generateToken(res, user._id, "refresh");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    refresh access token
// @route   GET /api/users/refresh
// @access  Public
const refreshAccessToken = asyncHandler((req, res) => {
  const { refreshToken } = req.cookies;
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, decoded) => {
    if (decoded && decoded.userId) {
      generateToken(res, decoded.userId, "access");
    } else {
      throw new Error(
        error?.message || "something went while refreshing access token"
      );
    }
  });
  res
    .status(200)
    .json({ message: "token refresh successfully", success: true });
});

// @desc    forget password
// @route   PUT /api/users/forgetPassword
// @access  Public
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    try {
      const password = generatePassword(8);
      user.password = password;
      await user.save();
      await sendEmail(email, password);
      res
        .status(200)
        .json({ message: "Check your email for new password", success: true });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong, Please try again");
    }
  } else {
    res.status(400);
    throw new Error("Please provide register email address");
  }
});

export {
  logoutUser,
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  refreshAccessToken,
  forgetPassword,
};
