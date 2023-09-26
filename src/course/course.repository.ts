import { CreateCourse } from "../util/model/course/create-course.ts";
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
  public createCourse = async (createNewCourseData: CreateCourse) => {
    try {
      // const newCourse = new CourseModel(createNewCourseData);
      // const createdCourse = await newCourse.save() as unknown as Course;
      // return createdCourse;
      return (await CourseModel.create(
        createNewCourseData
      )) as unknown as Course;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo thông tin khóa học: " + error.message);
    }
  };
}
