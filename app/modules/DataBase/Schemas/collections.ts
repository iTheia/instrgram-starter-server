import { Schema, model } from "mongoose";

interface CollectionName {
  collectionName: string;
}

const collectionSchema = new Schema<CollectionName>({
  collectionName: { type: String, required: true },
});

export const CollectionName = model<CollectionName>(
  "CollectionName",
  collectionSchema
);
