
import express from "express";
import User from "../models/user.model.js";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Check whether the signed-in user is an administrator
const requireAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req.auth._id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Could not verify admin permissions",
    });
  }
};

// CREATE - Public registration
// The controller always assigns role: "user"
router.post("/api/users", userCtrl.create);

// READ - Admin can list all users
router.get(
  "/api/users",
  authCtrl.requireSignin,
  requireAdmin,
  userCtrl.list
);

// DELETE ALL - Admin only
router.delete(
  "/api/users",
  authCtrl.requireSignin,
  requireAdmin,
  userCtrl.removeAll
);

// READ, UPDATE, DELETE individual users
router
  .route("/api/users/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.read
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.remove
  );

// Load the requested user
router.param("userId", userCtrl.userByID);

export default router;
