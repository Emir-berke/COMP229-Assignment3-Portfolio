
import express from "express";
import User from "../models/user.model.js";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Check if the signed-in user is an administrator
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

// QUALIFICATIONS COLLECTION
router
  .route("/api/qualifications")

  // Everyone can view qualifications
  .get(qualificationCtrl.list)

  // Only admins can add qualifications
  .post(
    authCtrl.requireSignin,
    requireAdmin,
    qualificationCtrl.create
  )

  // Only admins can delete all qualifications
  .delete(
    authCtrl.requireSignin,
    requireAdmin,
    qualificationCtrl.removeAll
  );

// INDIVIDUAL QUALIFICATION
router
  .route("/api/qualifications/:id")

  // Everyone can view a qualification
  .get(qualificationCtrl.read)

  // Only admins can update qualifications
  .put(
    authCtrl.requireSignin,
    requireAdmin,
    qualificationCtrl.update
  )

  // Only admins can delete qualifications
  .delete(
    authCtrl.requireSignin,
    requireAdmin,
    qualificationCtrl.remove
  );

export default router;
