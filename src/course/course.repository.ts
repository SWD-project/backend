import { CourseModel } from "./course.entity.ts";

export class CourseRepository {
  public getCourse = (id?: string) => {
    if (id) {
      return CourseModel.findById(id);
    } else {
      return CourseModel.find();
    }
  };
}
