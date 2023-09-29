import { CourseStatus } from "../util/model/courseStatus";
import { createCourseStatusRequest } from "../util/model/courseStatus/create-course-status";
import { CreateUserRequest } from "../util/model/user/create-user";
import { CourseStatusRepository } from "./courseStatus.repository";

export class CourseStatusService {
  private courseStatusRepository: CourseStatusRepository;

  constructor() {
    this.courseStatusRepository = new CourseStatusRepository();
  }

  async getCourseStatusById(id: string) {
    const courseStatus = (await this.courseStatusRepository.getCourseStatus(
      id
    )) as unknown as CourseStatus;
    if (courseStatus === null) return [];
    return [courseStatus];
  }
  async createNewCourseStatus(createCourseStatusN: createCourseStatusRequest) {
    try {
      const courseStatus =
        (await this.courseStatusRepository.createCourseStatus(
          createCourseStatusN.name
        )) as unknown as CourseStatus;
      if (courseStatus == null) return [];
      return [courseStatus];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo course status: " + error.message);
    }
  }
}
