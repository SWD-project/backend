import { CourseRepository } from "../course/course.repository.ts";
import { EnrolledCourse } from "../util/model/enrolledCourse";
import { EnrolledCourseRepository } from "./enrolledCourse.repository.ts";

export class EnrolledCourseService {
  private enrolledCourseRepository: EnrolledCourseRepository;
  private courseRepository: CourseRepository;
  constructor() {
    this.enrolledCourseRepository = new EnrolledCourseRepository();
    this.courseRepository = new CourseRepository();
  }
  async getEnrolledCourseById(id: string) {
    const enrolledCourse =
      (await this.enrolledCourseRepository.getEnrolledCourse(
        id
      )) as unknown as EnrolledCourse;
    if (enrolledCourse == null) return [];
    return [enrolledCourse];
  }
  async getAllEnrolledCourse() {
    const enrolledCourse =
      (await this.enrolledCourseRepository.getEnrolledCourse()) as unknown as EnrolledCourse;
    if (enrolledCourse == null) return [];
    return [enrolledCourse];
  }

  public create = async(studentId: string,courseId: string) => {
    
    const course = this.courseRepository.getCourse(courseId);
    if (!course) throw Error("CourseId is not Exist!");

    const enrolledCourse = await this.enrolledCourseRepository.getEnrolledCourseByCourseId(studentId, courseId);
    if (enrolledCourse) throw Error("You enrolled!");

    await this.enrolledCourseRepository.create(studentId, courseId);
    
  }
  async getAllEnrolledCourseByStudentId(studentId: string) {
    const enrolledCourseList =
      await this.enrolledCourseRepository.getEnrolledCourseByStutentId(
        studentId
      );
      console.log(enrolledCourseList)
    return enrolledCourseList;
  }
}
