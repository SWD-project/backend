import { Schema, model } from "mongoose";
const CourseSchema = new Schema(
  {
    lectureId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discountPercent: {
      type: Number,
      require: true,
    },
    thumbnailUrl: {
      type: String,
      require: true,
    },
    outcome: {
      type: String,
      require: true,
    },
    courseStatusId: {
      type: Schema.Types.ObjectId,
      ref: "CourseStatus",
    },
    totalLesson: {
      type: Number,
      require: true,
    },
    level: {
      type: Number,
      require: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
export const CourseModel = model("Course", CourseSchema);
