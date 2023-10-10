import { UserRepository } from "../user/user.repository.ts";
import { Course } from "../util/model/course";

import { CreateCourseRequest } from "../util/model/course/create-course";
import { SearchCourseRequest, SearchCourseResponse } from "../util/model/course/search-course.ts";
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
      const createdCourse = (await this.courseRepository.createCourse(
        user._id,
        courseData.title,
        courseData.description,
        courseData.price,
        courseData.level,
        courseData.categoryId,
        courseData.discountPercent,
        courseData.outcome,
        courseData.thumbnailUrl
      )) as unknown as Course;
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

  public search = async(title:string, page : number, pageSize: number) => {
    const courses = (await this.courseRepository.getCourse()) as unknown as Course[];

    
    if (!courses) return [];

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(title.toLowerCase())
    );

    if (filteredCourses.length == 0) console.log("fail " + title);
    if (filteredCourses.length == 0) return [];

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const coursesForPage = filteredCourses.slice(startIndex, endIndex);
    console.log(coursesForPage[0]._id);

    const response : SearchCourseResponse = {
      courses : coursesForPage,
      total : filteredCourses.length,
    }

    return [response];
  }
}
