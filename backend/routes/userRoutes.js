import express from "express";
const router = express.Router();
import { register } from "../controllers/userController.js";

// Authentication, Registration, and User Confirmation
router.post("/", register); // Create a new user

export default router;
