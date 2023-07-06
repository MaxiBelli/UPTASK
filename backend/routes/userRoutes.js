import express from "express";
const router = express.Router();
import { register, authenticate, confirm } from "../controllers/userController.js";

// Authentication, Registration, and User Confirmation
router.post("/", register); // Create a new user
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);

export default router;
