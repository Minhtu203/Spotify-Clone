import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUserInfo,
  followArtist,
} from "../controllers/userController.js";
import { middlewareController } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", middlewareController.verifyToken, getUsers);
router.post("/", createUser);
router.delete("/:id", middlewareController.verifyAdminToken, deleteUser);
router.post("/:id", middlewareController.verifyToken, updateUserInfo);

// follow artist
router.post(
  "/:userId/follow/artist/:artistId",
  middlewareController.verifyToken,
  followArtist
);
// follow albums
router.post(
  "/:userId/follow/artist/:albumId",
  middlewareController.verifyToken,
  followArtist
);

export default router;
