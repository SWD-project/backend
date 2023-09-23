import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
export const CategoryModel = model("Category", CategorySchema);
