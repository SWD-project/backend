import { CourseSectionModel } from "./courseSection.entity";

export class CourseSectionRepository {
  public getCourseSection = (id?: string) => {
    if (id) {
      return CourseSectionModel.findById(id);
    } else {
      return CourseSectionModel.find();
    }
  };
  // public getSection = async (id: string) => {
  //   try {
  //     return await CourseSectionModel.findOne({});
  //   } catch (error: any) {
  //     throw new Error("Lỗi khi tìm section: " + error.message);
  //   }
  // };
}
