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

  public getEnrolledCourseByCourseId = async (
    studentId: string,
    courseId: string
  ) => {
    return await EnrolledCourseModel.findOne({ studentId, courseId });
  };

  public getEnrolledCourseByStutentId = (id: string) => {
    return EnrolledCourseModel.find({ studentId: id }).populate("courseId");
  };

  public countEnroll = async (courseId: string) => {
    return await EnrolledCourseModel.countDocuments({ courseId });
  };

  public getByStudentIdAndCourseId = async (
    studentId: string,
    courseId: string
  ) => {
    return await EnrolledCourseModel.findOne({ studentId, courseId });
  };
}
