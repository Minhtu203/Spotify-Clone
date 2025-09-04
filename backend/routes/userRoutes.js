import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUserInfo,
  followArtist,
  getUserById,
  unFollowArtist,
} from "../controllers/userController.js";
import { middlewareController } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", middlewareController.verifyToken, getUsers); //get all users
router.get("/:userId", middlewareController.verifyToken, getUserById);

router.post("/", createUser);
router.post("/:id", middlewareController.verifyToken, updateUserInfo);

router.delete("/:id", middlewareController.verifyAdminToken, deleteUser);

// follow artist
router.post("/:userId/follow/artist/:artistId", followArtist);

//unfollow artist
router.post("/:userId/:artistId", unFollowArtist);

// follow albums
router.post(
  "/:userId/follow/artist/:albumId",
  middlewareController.verifyToken,
  followArtist
);

export default router;
