import { CourseSectionModel } from "./courseSection.entity";

export class CourseSectionRepository {
  public getCourseSection = (id?: string) => {
    if (id) {
      return CourseSectionModel.findById(id);
    } else {
      return CourseSectionModel.find();
    }
  };
}
