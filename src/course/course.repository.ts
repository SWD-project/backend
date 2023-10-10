import { config } from "../util/model/index.ts";
import { CourseModel } from "./course.entity.ts";

export class CourseRepository {
  public getCourse = async (id?: string) => {
    if (id) {
      return await CourseModel.findById(id);
    } else {
      return await CourseModel.find();
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
}
