import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
      require: true
    },
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);


export const CategoryModel = model("Category", CategorySchema);
