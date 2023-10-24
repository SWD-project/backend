import { EnrolledCourseModel } from "./enrolledCourse.entity";

export class EnrolledCourseRepository {
  public getEnrolledCourse = (id?: string) => {
    if (id) {
      return EnrolledCourseModel.findById(id);
    } else {
      return EnrolledCourseModel.find();
    }
  };

  public getEnrolledCourseByStutentId = (id: string) => {
    return EnrolledCourseModel.find({ studentId: id }).populate("CourseId").populate("lectureId");
  };
}
