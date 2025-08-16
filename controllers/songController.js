import Song from "../models/songModel.js";

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
    const song = await Song.findById(req.params.id).populate("artist album");
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
