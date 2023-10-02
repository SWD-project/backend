import { CategoryRepository } from "../category/category.repository";
import { CourseStatusRepository } from "../courseStatus/courseStatus.repository";
import { Course } from "../util/model/course";

import { CreateCourseRequest } from "../util/model/course/create-course";
import { CourseRepository } from "./course.repository";

export class CourseService {
  private courseRepository: CourseRepository;
  private courseStatusRepository: CourseStatusRepository;
  private categoryRepository: CategoryRepository;
  constructor() {
    this.courseRepository = new CourseRepository();
    this.courseStatusRepository = new CourseStatusRepository();
    this.categoryRepository = new CategoryRepository();
  }
  async getCourseById(id: string) {
    const course = (await this.courseRepository.getCourse(
      id
    )) as unknown as Course;
    if (course == null) return [];
    return [course];
  }
  async getAllCourse() {
    const course =
      (await this.courseRepository.getCourse()) as unknown as Course;
    if (course == null) return [];
    return [course];
  }
  async createNewCourse(courseData: CreateCourseRequest) {
    try {
      const courseStatus = await this.courseStatusRepository.getCourseStatus(
        courseData.courseStatusId
      );
      const category = await this.categoryRepository.getCategory(
        courseData.categoryId
      );
      if (!courseStatus || !category) {
        throw new Error(
          "Không tìm thấy course status hoặc category với id đã cung cấp"
        );
      }
      const createdCourse = (await this.courseRepository.createCourse(
        courseData.title,
        courseData.description,
        courseData.price,
        courseData.totalLesson,
        courseData.level,
        courseData.categoryId,
        courseData.courseStatusId
      )) as unknown as Course;
      return [createdCourse];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo khóa học mới: " + error.message);
    }
  }
}
