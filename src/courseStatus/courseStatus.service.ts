import { CourseStatus } from "../util/model/courseStatus";
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
}
