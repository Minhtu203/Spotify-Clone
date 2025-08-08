import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    bio: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Artist", artistSchema);
