
import express from "express";
import User from "../models/user.model.js";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Check whether the signed-in user is an admin
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

// CONTACT COLLECTION
router
  .route("/api/contacts")

  // Only admins can view submitted contacts
  .get(
    authCtrl.requireSignin,
    requireAdmin,
    contactCtrl.list
  )

  // Visitors can submit the Contact Me form
  .post(contactCtrl.create)

  // Only admins can delete all contacts
  .delete(
    authCtrl.requireSignin,
    requireAdmin,
    contactCtrl.removeAll
  );

// INDIVIDUAL CONTACT
router
  .route("/api/contacts/:id")

  // Only admins can read contact details
  .get(
    authCtrl.requireSignin,
    requireAdmin,
    contactCtrl.read
  )

  // Only admins can update contacts
  .put(
    authCtrl.requireSignin,
    requireAdmin,
    contactCtrl.update
  )

  // Only admins can delete contacts
  .delete(
    authCtrl.requireSignin,
    requireAdmin,
    contactCtrl.remove
  );

export default router;
