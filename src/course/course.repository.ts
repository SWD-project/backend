import { CourseModel } from "./course.entity.ts";

export class CourseRepository {
  public getCourse = async (id?: string) => {
    if (id) {
      return await CourseModel.findById(id);
    } else {
      return await CourseModel.find();
    }
  };
  public createCourse = async (
    lectureId: string,
    title: string,
    description: string,
    price: number,
    level: number,
    categoryId: string,
    discountPercent: number,
    outcome: string,
    thumbnailUrl: string
  ) => {
    try {
      const createCourse = await CourseModel.create({
        lectureId,
        categoryId,
        courseStatus: 1,
        description,
        discountPercent,
        level,
        outcome,
        price,
        rating: 0,
        thumbnailUrl,
        title,
        totalLesson: 0,
      });
      return createCourse;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo thông tin khóa học: " + error.message);
    }
  };
}
