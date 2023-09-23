import { Schema } from "mongoose";

const courseLessonSchema = new Schema({
  courseSectionId: {
    type: Schema.Types.ObjectId,
  },
});
