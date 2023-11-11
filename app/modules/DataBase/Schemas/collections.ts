import { Schema, model } from "mongoose";

interface CollectionName {
  name: string;
}

const collectionSchema = new Schema<CollectionName>({
  name: { type: String, required: true },
});

export const CollectionName = model<CollectionName>(
  "CollectionName",
  collectionSchema
);