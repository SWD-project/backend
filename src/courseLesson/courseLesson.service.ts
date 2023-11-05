import { CourseSectionRepository } from "../courseSection/courseSection.repository.ts";
import { CourseLesson } from "../util/model/courseLesson";

import { GetCourseLessonBySectionRespone } from "../util/model/courseLesson/get-course-lesson.ts";
import { UpdateCourseLessonRequest } from "../util/model/courseLesson/update-course-lesson.ts";

import { CourseSection } from "../util/model/courseSection";
import { CourseLessonRepository } from "./courseLesson.repository.ts";

export class CourseLessonService {
  private courseLessonRepository: CourseLessonRepository;
  private courseSectionRepository: CourseSectionRepository;
  constructor() {
    this.courseLessonRepository = new CourseLessonRepository();
    this.courseSectionRepository = new CourseSectionRepository();
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
  public createCourseLesson = async (
    courseSectionId: string,
    description: string,
    title: string,
    duration: number,
    index: number
  ) => {
    try {
      const section = (await this.courseSectionRepository.getCourseSection(
        courseSectionId
      )) as unknown as CourseSection;
      if (!section) throw Error("courseSectionId not exist");
      const courseLS = (await this.courseLessonRepository.createCourseLesson(
        courseSectionId,
        description,
        title,
        duration,
        index
      )) as unknown as CourseLesson;
      return [courseLS];
    } catch (error: any) {
      throw new Error("Lỗi khi tạo lesson: " + error.message);
    }
  };
  public updateCourseLesson = async (data: UpdateCourseLessonRequest) => {
    // const lesson = (await this.courseLessonRepository.getCourseLesson(
    //   data._id
    // )) as unknown as CourseLesson;
    // if (!lesson) throw Error("lesson is not exist!");
    await this.courseLessonRepository.update(data);
  };

  public getLessonBySectionId = async (sectionId: string) => {
    const lesson =
      (await this.courseLessonRepository.getCourseLessonByCourseSectionId(
        sectionId
      )) as unknown as CourseLesson[];
    if (!lesson) return [];
    return lesson;
  };

  public getCourseLessonBySectionId = async (sectionId: string) => {
    const lessons =
      (await this.courseLessonRepository.getCourseLessonByCourseSectionId(
        sectionId
      )) as unknown as CourseLesson[];
    if (!lessons) return [];
    const responses: GetCourseLessonBySectionRespone[] = [];
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const respone: GetCourseLessonBySectionRespone = {
        _id: lesson._id,
        courseSectionId: lesson.courseSectionId,
        description: lesson.description,
        title: lesson.title,
        duration: lesson.duration,
        index: lesson.index,
      };
      responses.push(respone);
    }
    return responses;
  };

  public deleteCourseLesson = async (id: string) => {
    if (!id) throw Error("id not exist!!");
    await this.courseLessonRepository.deleteCourseLesson(id);
  };
}
