import { Schema, model } from "mongoose";

const EnrolledCourseSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    totalCompleteLesson: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
export const EnrolledCourseModel = model(
  "EnrolledCourse",
  EnrolledCourseSchema
);
