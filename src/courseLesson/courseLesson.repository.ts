import { courseLessonModel } from "./courseLesson.entity.ts";

export class CourseLessonRepository {
  public getCourseLesson = (id?: string) => {
    if (id) {
      return courseLessonModel.findById(id);
    } else {
      return courseLessonModel.find();
    }
  };
}
