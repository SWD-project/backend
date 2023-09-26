import { Course } from "../util/model/course";
import { CreateCourse } from "../util/model/course/create-course";
import { CourseRepository } from "./course.repository";

export class CourseService {
  private courseRepository: CourseRepository;
  constructor() {
    this.courseRepository = new CourseRepository();
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
  async createNewCourse(courseData: CreateCourse) {
    try {
      const createdCourse =
        await this.courseRepository.createCourse(courseData);
      return [createdCourse];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo khóa học mới: " + error.message);
    }
  }
}
