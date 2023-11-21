import mongoose, { Schema, model } from "mongoose";

interface CollectionsPost {
  collectionName: string;
}

const collectionSchema = new Schema<CollectionsPost>({
  collectionName: { type: String, required: true },
});

export const CollectionsPost =
  mongoose.models.CollectionsPost ||
  model<CollectionsPost>("CollectionsPost", collectionSchema);
