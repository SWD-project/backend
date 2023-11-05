import { CourseRepository } from "../course/course.repository.ts";
import { CourseSection } from "../util/model/courseSection";
import { UpdateCourseSectionRequest } from "../util/model/courseSection/update-section.ts";
import { CourseSectionRepository } from "./courseSection.repository.ts";

export class CourseSectionService {
  private courseSectionRepository: CourseSectionRepository;
  private courseRepository: CourseRepository;
  constructor() {
    this.courseSectionRepository = new CourseSectionRepository();
    this.courseRepository = new CourseRepository();
  }
  async getCourseSectionById(id: string) {
    const courseSection = (await this.courseSectionRepository.getCourseSection(
      id
    )) as unknown as CourseSection;
    if (courseSection == null) return [];
    return [courseSection];
  }

  public create = async (
    timeComplete: number,
    courseId: string,
    title: string,
    description: string
  ) => {
    const check = await this.courseRepository.getCourse(courseId);
    if (!check) throw Error("Course is not exist!");
    await this.courseSectionRepository.createSection(
      timeComplete,
      courseId,
      title,
      description
    );
  };
  public getAllCourseSection = async (courseId: string) => {
    const sections = (await this.courseSectionRepository.getSectionByCourseId(
      courseId
    )) as unknown as CourseSection[];
    if (!sections) return [];
    return sections;
  };
  public update = async (request: UpdateCourseSectionRequest) => {
    const updateSection = await this.courseSectionRepository.update(request);
  };
}
