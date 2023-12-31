import { Schema, model } from "mongoose";

const completeCourseSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);
export const CompleteCourseModel = model(
  "CompleteCourse",
  completeCourseSchema
);
