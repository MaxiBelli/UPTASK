import express from "express";
const router = express.Router();
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  checkToken,
  newPassword
} from "../controllers/userController.js";

// Authentication, Registration, and User Confirmation
router.post("/", register); // Create a new user
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);

export default router;
