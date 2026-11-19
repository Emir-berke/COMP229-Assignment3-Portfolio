
import express from "express";
import User from "../models/user.model.js";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Verify that the signed-in user is an administrator
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);

    if (!user || user.role !== "admin") {
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

// PROJECT COLLECTION
router
  .route("/api/projects")

  // Anyone can view projects
  .get(projectCtrl.list)

  // Only admins can create projects
  .post(
    authCtrl.requireSignin,
    requireAdmin,
    projectCtrl.create
  )

  // Only admins can delete all projects
  .delete(
    authCtrl.requireSignin,
    requireAdmin,
    projectCtrl.removeAll
  );

// INDIVIDUAL PROJECT
router
  .route("/api/projects/:id")

  // Anyone can view a project
  .get(projectCtrl.read)

  // Only admins can update projects
  .put(
    authCtrl.requireSignin,
    requireAdmin,
    projectCtrl.update
  )

  // Only admins can delete projects
  .delete(
    authCtrl.requireSignin,
    requireAdmin,
    projectCtrl.remove
  );

export default router;
