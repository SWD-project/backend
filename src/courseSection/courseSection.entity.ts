import { Schema, model } from "mongoose";

const CourseSectionSchema = new Schema(
  {
    timeComplete: {
      type: Number,
      require: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export const CourseSectionModel = model("CourseSection", CourseSectionSchema);
