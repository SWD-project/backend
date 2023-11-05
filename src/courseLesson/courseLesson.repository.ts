import { UpdateCourseLessonRequest } from "../util/model/courseLesson/update-course-lesson.ts";
import { courseLessonModel } from "./courseLesson.entity.ts";

//bài học - từng bài học có time
export class CourseLessonRepository {
  public getCourseLesson = (id?: string) => {
    if (id) {
      return courseLessonModel.findById(id);
    } else {
      return courseLessonModel.find();
    }
  };

  public createCourseLesson = async (
    courseSectionId: string,
    description: string,
    title: string,
    duration: number,
    index: number
  ) => {
    try {
      const createCL = await courseLessonModel.create({
        courseSectionId,
        description,
        title,
        duration,
        index,
      });
      return createCL;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo bài học: " + error.message);
    }
  };
  public updateCourseLesson = async (
    courseSectionId: string,
    description: string,
    title: string,
    duration: number,
    index: number
  ) => {
    await courseLessonModel.updateOne(
      { _id: courseSectionId },
      { $set: { description, title, duration, index } }
    );
  };

  public getCourseLessonByCourseSectionId = async (courseSectionId: string) => {
    return courseLessonModel.find({ courseSectionId });
  };

  public deleteCourseLesson = async (id: string) => {
    await courseLessonModel.deleteOne({ _id: id });
  };
}
