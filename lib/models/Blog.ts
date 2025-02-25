// lib/models/Blog.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  published: boolean;
  author: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  published: { type: Boolean, default: false },
  author: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Use existing model if it exists (helpful in development)
export const Blog: Model<IBlog> = 
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);
