import { EnrolledCourseModel } from "./enrolledCourse.entity.ts";

export class EnrolledCourseRepository {
  public getEnrolledCourse = (id?: string) => {
    if (id) {
      return EnrolledCourseModel.findById(id);
    } else {
      return EnrolledCourseModel.find();
    }
  };

  public create = async (studentId: string, courseId: string) => {
    await EnrolledCourseModel.create({
      studentId,
      courseId,
      totalCompleteLesson: 0,
    });
  };

  public getEnrolledCourseByCourseId = async (courseId: string) => {
    return await EnrolledCourseModel.findOne({ courseId });
  };

  public getEnrolledCourseByStutentId = (id: string) => {
    return EnrolledCourseModel.find({ studentId: id }).populate("CourseId").populate("lectureId");
  };
}
