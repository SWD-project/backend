import { Schema, model } from "mongoose";
const CourseStatusSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});
export const CourseStatusModel = model("CourseStatus", CourseStatusSchema);
