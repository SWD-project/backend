import { UserRepository } from "../user/user.repository.ts";
import { Course } from "../util/model/course";

import { CreateCourseRequest } from "../util/model/course/create-course";
import { User } from "../util/model/user/index.ts";
import { CourseRepository } from "./course.repository.ts";

export class CourseService {
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
    this.userRepository = new UserRepository();
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
  async createNewCourse(uuid: string, courseData: CreateCourseRequest) {
    try {

      const user = (await this.userRepository.getUserByUuid(
        uuid
      )) as unknown as User;
      if (user.roleId !== "1") throw new Error("Unauthorized");

      const createdCourse = (await this.courseRepository.createCourse({
        ...courseData,
        lectureId: user._id,
      })) as unknown as Course;
      return [createdCourse];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo khóa học mới: " + error.message);
    }
  }

  async getCourseByCategoryId(categoryId: string, pageNumber:number, pageSize:number) {
    const course = (await this.courseRepository.getCourseByCategoryId(categoryId, pageNumber, pageSize)) as unknown as Course[];
    
    if (course == null) return [];
    return course;
  }

  async countCourse(categoryId: string) {
    return await this.courseRepository.countCourse(categoryId);
  }
}
