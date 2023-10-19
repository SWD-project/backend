import { Schema, model } from "mongoose";

const CourseSectionSchema = new Schema({
  timeComplete: {
    type: Number,
    require: true,
  },
  coureseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  title: {
    String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
}, { timestamps: true });
export const CourseSectionModel = model("CourseSection", CourseSectionSchema);
