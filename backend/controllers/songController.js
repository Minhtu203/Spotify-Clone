import Song from "../models/songModel.js";
import mongoose from "mongoose";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("artist album");
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSong = async (req, res) => {
  try {
    const songId = req.params.songId; // ⚠️ phải dùng songId
    const song = await Song.findById(songId).populate("artist album");
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const incrementPlay = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    song.plays += 1;
    await song.save();
    res.json({ plays: song.plays });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSongById = async (req, res) => {
  try {
    const artist_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(artist_id)) {
      return res
        .status(400)
        .json({ message: "artist_id is not valid ObjectId" });
    }
    const songs = await Song.find({
      artist: new mongoose.Types.ObjectId(artist_id),
    }).populate("artist");

    if (!songs || songs.length === 0) {
      return res
        .status(404)
        .json({ message: "No songs found for this artist" });
    }
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSong = async (req, res) => {
  try {
    const songId = req.params.id; // lấy id từ URL
    const updatedData = req.body; // dữ liệu muốn sửa

    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      updatedData,
      { new: true } // trả về document mới sau khi update
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;

    const deletedSong = await Song.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
