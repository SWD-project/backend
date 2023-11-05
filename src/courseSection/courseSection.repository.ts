import { CreateCourseSectionRequest } from "../util/model/courseSection/create-section.ts";
import { UpdateCourseSectionRequest } from "../util/model/courseSection/update-section.ts";
import { CourseSectionModel } from "./courseSection.entity.ts";

export class CourseSectionRepository {
  public getCourseSection = (id?: string) => {
    if (id) {
      return CourseSectionModel.findById(id);
    } else {
      return CourseSectionModel.find();
    }
  };
  public createSection = async (
    timeComplete: number,
    courseId: string,
    title: string,
    description: string
  ) => {
    await CourseSectionModel.create({
      timeComplete,
      courseId,
      title,
      description,
    });
  };
  public getSectionByCourseId = async (courseId: string) => {
    return await CourseSectionModel.find({ courseId });
  };
  public update = async (data: UpdateCourseSectionRequest) => {
    await CourseSectionModel.updateOne({ _id: data._id }, { $set: data });
  };
}
