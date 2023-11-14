import { Schema, model } from "mongoose";

interface Media {
  url: string;
}

const mediaSchema = new Schema<Media>({
  url: { type: String, required: true },
});

export const Media = model<Media>("media", mediaSchema);
