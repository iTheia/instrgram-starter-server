import mongoose, { Schema, model } from "mongoose";

interface Media {
  url: string;
}

const mediaSchema = new Schema<Media>({
  url: { type: String },
});

export const Media =
  mongoose.models.media || model<Media>("media", mediaSchema);
