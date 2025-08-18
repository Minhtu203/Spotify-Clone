import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUserInfo,
} from "../controllers/userController.js";
import { middlewareController } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", middlewareController.verifyToken, getUsers);
router.post("/", createUser);
router.delete("/:id", middlewareController.verifyAdminToken, deleteUser);
router.post("/:id", middlewareController.verifyToken, updateUserInfo);

export default router;
