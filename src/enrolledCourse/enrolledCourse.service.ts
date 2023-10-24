import { EnrolledCourse } from "../util/model/enrolledCourse";
import { EnrolledCourseRepository } from "./enrolledCourse.repository";

export class EnrolledCourseService {
  private enrolledCourseRepository: EnrolledCourseRepository;
  constructor() {
    this.enrolledCourseRepository = new EnrolledCourseRepository();
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
  async getAllEnrolledCourseByStudentId(studentId: string) {
    const enrolledCourseList =
      await this.enrolledCourseRepository.getEnrolledCourseByStutentId(
        studentId
      );
      console.log(enrolledCourseList)
    return [enrolledCourseList];
  }
}
