// backend/routes/search.js
import express from "express";
import Song from "../models/songModel.js"; // model Song mongoose

const router = express.Router();

// GET /api/search?q=...
router.get("/", async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query.trim()) return res.json([]);

    // bỏ dấu tiếng Việt + lowercase
    const normalizeText = (str) =>
      str
        .normalize("NFD") // tách dấu
        .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
        .toLowerCase();

    const songs = await Song.find({});
    const results = songs.filter((song) => {
      const name = normalizeText(song.name || "");
      const artist = normalizeText(song.artist?.name || "");
      const keyword = normalizeText(query);

      return name.includes(keyword) || artist.includes(keyword);
    });

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
