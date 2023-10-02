import { CourseStatusModel } from "./courseStatus.entity";

export class CourseStatusRepository {
  public getCourseStatus = (id?: string) => {
    if (id) {
      return CourseStatusModel.findById(id);
    } else {
      return CourseStatusModel.find();
    }
  };
  public getCourseStatusByName = (name: string) => {
    return CourseStatusModel.find({
      name
    })
  }
  public createCourseStatus = async (name: string) => {
    try {
      const createCourseStatus = await CourseStatusModel.create({
        name,
      });
      return createCourseStatus;
    } catch (error: any) {
      console.log(error);
      throw new Error("Lỗi khi tạo course status: " + error.message);
    }
  };
}
