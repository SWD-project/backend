import { Course } from "../util/model/course/index.ts";
import { UpdateCourseRequest } from "../util/model/course/update-course.ts";
import { config } from "../util/model/index.ts";
import { CourseModel } from "./course.entity.ts";

export class CourseRepository {
  public getCourse = async (id?: string) => {
    if (id) {
      return await CourseModel.findById(id).populate("lectureId");
    } else {
      return await CourseModel.find({ courseStatus: 1 });
    }
  };
  public createCourse = async (variables: {
    lectureId: string;
    title: string;
    description: string;
    price: number;
    level: number;
    categoryId: string;
    discountPercent: number;
    outcome: string;
    thumbnailUrl: string;
  }) => {
    try {
      const createCourse = await CourseModel.create({
        ...variables,
        rating: 0,
        courseStatus: config.courseActive,
        totalLesson: 0,
      });
      return createCourse;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo thông tin khóa học: " + error.message);
    }
  };

  public getCourseByCategoryId = async (
    categoryId: string,
    page: number,
    pageSize: number
  ) => {
    const skip = (page - 1) * pageSize;

    return await CourseModel.find({ categoryId })
      .skip(skip)
      .limit(pageSize)
      .exec();
  };

  public countCourse = async (categoryId: string) => {
    return await CourseModel.countDocuments({ categoryId });
  };

  public updateRating = async (courseId: string, rating: number) => {
    await CourseModel.updateOne({ _id: courseId }, { $set: { rating } });
  };

  public updateStatus = async (courseId: string, courseStatus: number) => {
    await CourseModel.updateOne({ _id: courseId }, { $set: { courseStatus } });
  };

  public update = async (
    updateData: UpdateCourseRequest
  ) => {
    await CourseModel.updateOne({ _id: updateData._id }, { $set: updateData });
  };

  public getCourseByLectureId = async(lectureId: string, page: number, pageSize : number) => {
    const skipCount = (page - 1) * pageSize;

    return await CourseModel.find({ lectureId })
      .skip(skipCount)
      .limit(pageSize);
  }
}
