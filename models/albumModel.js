import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    releaseDate: { type: Number },
    coverUrl: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export default mongoose.model("Album", albumSchema);
