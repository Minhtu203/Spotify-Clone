import express from "express";
import { authCallback } from "../controllers/authController.js";

const router = express.Router();

// Route callback sau khi Google login qua Clerk
router.post("/callback", authCallback);

export default router;
