
import User from "../models/user.model.js";
import errorHandler from "./error.controller.js";

// CREATE - Register a new user
const create = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
    role: "user",
  });

  try {
    await user.save();

    return res.status(201).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// READ - List all users
const list = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role updated created");

    return res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Find user by ID
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

// READ - Get one user
const read = (req, res) => {
  const safeUser = req.profile.toObject();

  delete safeUser.hashed_password;
  delete safeUser.salt;

  return res.json(safeUser);
};

// UPDATE - Update user information
const update = async (req, res) => {
  try {
    const user = req.profile;

    // Only allow these fields to be updated
    const { name, email, password } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (password !== undefined) {
      user.password = password;
    }

    user.updated = Date.now();

    await user.save();

    const safeUser = user.toObject();

    delete safeUser.hashed_password;
    delete safeUser.salt;

    return res.json(safeUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE - Remove one user
const remove = async (req, res) => {
  try {
    const user = req.profile;

    await user.deleteOne();

    return res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE ALL - Existing administrative operation
// Must be protected by admin authorization in user.routes.js
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});

    return res.status(200).json({
      message: "All users deleted.",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  userByID,
  read,
  list,
  update,
  remove,
  removeAll,
};
