import { CategoryRepository } from "../category/category.repository.ts";
import { CourseStatusRepository } from "../courseStatus/courseStatus.repository.ts";
import { CreateCourseRequest } from "../util/model/course/create-course.ts";
import { Course } from "../util/model/course/index.ts";
import { CourseModel } from "./course.entity.ts";

export class CourseRepository {
  public getCourse = (id?: string) => {
    if (id) {
      return CourseModel.findById(id);
    } else {
      return CourseModel.find();
    }
  };
  public createCourse = async (
    title: string,
    description: string,
    price: number,
    totalLesson: number,
    level: number,
    categoryId: string,
    courseStatusId: string
  ) => {
    try {
      const createCourse = await CourseModel.create({
        title,
        description,
        price,
        totalLesson,
        level,
        categoryId,
        courseStatusId,
      });
      return createCourse;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo thông tin khóa học: " + error.message);
    }
  };
}
