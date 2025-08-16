import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    duration: { type: Number },
    audioUrl: { type: String },
    plays: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
