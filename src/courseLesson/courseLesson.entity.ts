import { Schema, model } from "mongoose";

const CourseLessonSchema = new Schema({
  courseSectionId: {
    type: Schema.Types.ObjectId,
    ref: "CourseSection",
  },
  description: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  index: {
    type: Number,
    require: true,
  },
});
export const courseLessonModel = model("CourseLesson", CourseLessonSchema);
