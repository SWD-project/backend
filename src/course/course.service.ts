import { EnrolledCourseRepository } from "../enrolledCourse/enrolledCourse.repository.ts";
import { TransactionRepository } from "../transaction/transaction.repository.ts";
import { UserRepository } from "../user/user.repository.ts";
import { Course } from "../util/model/course";

import { CreateCourseRequest } from "../util/model/course/create-course";
import { GetCourseByLectureResponse } from "../util/model/course/get-course-lecture.ts";
import { GetCourseResponse } from "../util/model/course/get-course.ts";
import {
  SearchCourseRequest,
  SearchCourseResponse,
} from "../util/model/course/search-course.ts";
import { UpdateCourseRequest } from "../util/model/course/update-course.ts";
import { config } from "../util/model/index.ts";
import { User } from "../util/model/user/index.ts";
import { CourseRepository } from "./course.repository.ts";

export class CourseService {
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;
  private enrollRepository: EnrolledCourseRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
    this.userRepository = new UserRepository();
    this.enrollRepository = new EnrolledCourseRepository();
    this.transactionRepository = new TransactionRepository();
  }
  async getCourseById(id: string) {
    const course = (await this.courseRepository.getCourse(
      id
    )) as unknown as GetCourseResponse;
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
      if (user.roleId !== config.lecture) throw new Error("Unauthorized");

      const createdCourse = (await this.courseRepository.createCourse({
        ...courseData,
        lectureId: user._id,
      })) as unknown as Course;
      return [createdCourse];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo khóa học mới: " + error.message);
    }
  }

  async getCourseByCategoryId(
    categoryId: string,
    pageNumber: number,
    pageSize: number
  ) {
    console.log(categoryId, pageNumber, pageSize);
    const course = (await this.courseRepository.getCourseByCategoryId(
      categoryId,
      pageNumber,
      pageSize
    )) as unknown as Course[];

    if (course == null) return [];
    return course;
  }

  async countCourse(categoryId: string) {
    return await this.courseRepository.countCourse(categoryId);
  }

  public search = async (title: string, page: number, pageSize: number) => {
    const courses =
      (await this.courseRepository.getCourse()) as unknown as Course[];

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

    const response: SearchCourseResponse = {
      courses: coursesForPage,
      total: filteredCourses.length,
    };

    return [response];
  };

  public updateRating = async (courseId: string, rating: number) => {
    if (rating < 0 || rating > 5) throw Error("Invalid rating!");

    await this.courseRepository.updateRating(courseId, rating);
  };

  public updateStatus = async (courseId: string) => {
    const course = (await this.courseRepository.getCourse(
      courseId
    )) as unknown as Course;
    if (!course) throw Error("course id is not exist!");

    if (course.courseStatus === 0) {
      await this.courseRepository.updateStatus(courseId, 1);
    } else {
      await this.courseRepository.updateStatus(courseId, 0);
    }
  };

  public update = async (request: UpdateCourseRequest) => {
    const course = (await this.courseRepository.getCourse(
      request._id
    )) as unknown as Course;
    if (!course) throw Error("course id is not exist!");

    await this.courseRepository.update(request);
  };

  public getCourseByLecture = async (
    lectureId: string,
    page: number,
    limit: number
  ) => {
    const courses = (await this.courseRepository.getCourseByLectureId(
      lectureId,
      page,
      limit
    )) as unknown as Course[];
    if (!courses) return [];

    const responses: GetCourseByLectureResponse[] = [];

    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const count = await this.enrollRepository.countEnroll(courses[i]._id);
      const total = await this.transactionRepository.sumTotal(course._id);

      const respose: GetCourseByLectureResponse = {
        _id: course._id,
        title: course.title,
        rating: course.rating,
        description: course.description,
        price: course.price,
        discountPercent: course.discountPercent,
        thumbnailUrl: course.thumbnailUrl,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        outcome: course.outcome,
        courseStatus: course.courseStatus,
        totalLesson: course.totalLesson,
        level: course.level,
        categoryId: course.categoryId,
        lectureId: course.lectureId,
        totalEnrolled: count,
        totalMoney: (total * 80) / 100,
      };
      responses.push(respose);
    }
    return responses;
  };
}
