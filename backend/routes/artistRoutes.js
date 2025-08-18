import express from "express";
import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} from "../controllers/artistController.js";

const router = express.Router();

// Tạo artist mới
router.post("/", createArtist);

// Lấy danh sách tất cả artists
router.get("/", getAllArtists);

// Lấy thông tin artist theo id
router.get("/:id", getArtistById);

// Cập nhật thông tin artist
router.put("/:id", updateArtist);

// Xóa artist
router.delete("/:id", deleteArtist);

export default router;
