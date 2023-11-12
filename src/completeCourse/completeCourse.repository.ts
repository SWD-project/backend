import { CompleteCourseModel } from "./completeCourse.entity.ts";

export class CompleteCourseRepository {
  public getCompleteCourse = (id?: string) => {
    if (id) {
      return CompleteCourseModel.findById(id);
    } else {
      return CompleteCourseModel.find();
    }
  };
  public createCompleteCourse = async (studentId: string, courseId: string) => {
    await CompleteCourseModel.create({ studentId, courseId });
  };
  public getCompleteCourseByStudent = async (studentId: string) => {
    return await CompleteCourseModel.find({ studentId }).populate("courseId");
  };
}
