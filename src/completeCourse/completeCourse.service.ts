import { CompleteCourse } from "../util/model/completeCourse";
import { CompleteCourseRepository } from "./completeCourse.repository";

export class CompleteCourseService {
  private completeCourseRepository: CompleteCourseRepository;
  constructor() {
    this.completeCourseRepository = new CompleteCourseRepository();
  }
  public async getAllCompleteCourse() {
    const completeCourse =
      (await this.completeCourseRepository.getCompleteCourse()) as unknown as CompleteCourse;
    if (completeCourse == null) return [];
    return [completeCourse];
  }
}
