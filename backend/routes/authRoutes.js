import express from "express";
import { authController } from "../controllers/authController.js";
import { middlewareController } from "../middleware/authMiddleware.js";

const router = express.Router();

//register
router.post("/register", authController.registerUser);

//login
router.post("/login", authController.loginUser);

//refresh
router.post("/refresh", authController.requestRefreshToken);

//logout
router.post("/logout", authController.logoutUser);

export default router;
