import { CourseLesson } from "../util/model/courseLesson";
import { CourseLessonRepository } from "./courseLesson.repository";

export class CourseLessonService {
  private courseLessonRepository: CourseLessonRepository;
  constructor() {
    this.courseLessonRepository = new CourseLessonRepository();
  }
  public async getAllCourseLesson() {
    const courseLesson =
      (await this.courseLessonRepository.getCourseLesson()) as unknown as CourseLesson;
    if (courseLesson == null) return [];
    return [courseLesson];
  }
  public async getCourseLessonById(id: string) {
    const courseLesson = (await this.courseLessonRepository.getCourseLesson(
      id
    )) as unknown as CourseLesson;
    if (courseLesson == null) return [];
    return [courseLesson];
  }
}
