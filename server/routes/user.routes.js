
import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Create a new user
router.route("/api/users").post(userCtrl.create);

// Get all users
router.route("/api/users").get(userCtrl.list);

// Delete all users (JWT required)
router.route("/api/users").delete(
  authCtrl.requireSignin,
  userCtrl.removeAll
);

// Get, update, or delete a user by ID
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
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

// Find user by ID
router.param("userId", userCtrl.userByID);

export default router;
