import { CourseSection } from "../util/model/courseSection";
import { CourseSectionRepository } from "./courseSection.repository";

export class CourseSectionService {
  private courseSectionRepository: CourseSectionRepository;
  constructor() {
    this.courseSectionRepository = new CourseSectionRepository();
  }
  async getCourseById(id: string) {
    const courseSection = (await this.courseSectionRepository.getCourseSection(
      id
    )) as unknown as CourseSection;
    if (courseSection == null) return [];
    return [courseSection];
  }
  async getAllCourse() {
    const courseSection =
      (await this.courseSectionRepository.getCourseSection()) as unknown as CourseSection;
    if (courseSection == null) return [];
    return [courseSection];
  }
}
