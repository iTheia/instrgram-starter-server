import { Schema, model } from "mongoose";

interface CollectionsPost {
  name: string;
}

const CollectionsSchema = new Schema<CollectionsPost>({
  name: { type: String, required: true },
});

export const CollectionsPost = model<CollectionsPost>("CollectionsPost", CollectionsSchema);
