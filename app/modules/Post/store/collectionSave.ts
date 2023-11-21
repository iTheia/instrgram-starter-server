import { Schema, model } from "mongoose";

interface CollectionsPost {
  collectionName: string;
}

const collectionSchema = new Schema<CollectionsPost>({
  collectionName: { type: String, required: true },
});

export const CollectionsPost = model<CollectionsPost>(
  "CollectionsPost",
  collectionSchema
);
