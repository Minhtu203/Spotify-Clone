import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    bio: { type: String },
    imageUrl: { type: String },
    coverUrl: { type: String },
  },
  {
    timestamps: true,
  },
  { strict: false }
);

export default mongoose.model("Artist", artistSchema);
