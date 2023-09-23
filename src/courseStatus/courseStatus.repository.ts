import { CourseStatusModel } from "./courseStatus.entity";

export class CourseStatusRepository {
  public getCourseStatus = (id?: string) => {
    if (id) {
      return CourseStatusModel.findById(id);
    } else {
      return CourseStatusModel.find();
    }
  };
}
