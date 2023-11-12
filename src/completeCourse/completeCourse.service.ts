import { CourseRepository } from "../course/course.repository.ts";
import { CompleteCourse } from "../util/model/completeCourse";
import { Course } from "../util/model/course";
import { CompleteCourseRepository } from "./completeCourse.repository.ts";

export class CompleteCourseService {
  private completeCourseRepository: CompleteCourseRepository;
  private courseRepository: CourseRepository;
  constructor() {
    this.completeCourseRepository = new CompleteCourseRepository();
    this.courseRepository = new CourseRepository();
  }
  public async getAllCompleteCourse() {
    const completeCourse =
      (await this.completeCourseRepository.getCompleteCourse()) as unknown as CompleteCourse;
    if (completeCourse == null) return [];
    return [completeCourse];
  }
  public create = async (stuId: string, coId: string) => {
    const course = (await this.courseRepository.getCourse(
      coId
    )) as unknown as Course;
    if (!course) throw Error("CourseId is not exist!");
    await this.completeCourseRepository.createCompleteCourse(stuId, coId);
  };
  public async getAll(id: string) {
    const completeCourse =
      (await this.completeCourseRepository.getCompleteCourseByStudent(
        id
      )) as unknown as CompleteCourse[];
    if (completeCourse == null) return [];
    return [completeCourse];
  }
}
