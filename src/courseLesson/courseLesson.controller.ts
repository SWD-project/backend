import { Router } from "express";
import { CourseLessonService } from "./courseLesson.service.ts";
import bodyParser from "body-parser";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { CourseLesson } from "../util/model/courseLesson";
import {
  CreateCourseLessonRequest,
  CreateCourseLessonRespone,
} from "../util/model/courseLesson/create-course-lesson.ts";
import { CourseSectionService } from "../courseSection/courseSection.service.ts";
import {
  UpdateCourseLessonRequest,
  UpdateCourseLessonRespone,
} from "../util/model/courseLesson/update-course-lesson.ts";
import {
  GetCourseLessonBySectionRequest,
  GetCourseLessonBySectionRespone,
} from "../util/model/courseLesson/get-course-lesson.ts";

const CourseLessonRounter = Router();
CourseLessonRounter.use(bodyParser.json());
const courseLessonService = new CourseLessonService();
const courseSectionService = new CourseSectionService();
CourseLessonRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/", async (req, res, next) => {
    try {
      const listCourseLesson = await courseLessonService.getAllCourseLesson();
      const response: ResponseBody<CourseLesson> = {
        data: listCourseLesson,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/create-new-lesson", async (req, res, next) => {
    try {
      const request: CreateCourseLessonRequest = req.body;

      const createLesson = await courseLessonService.createCourseLesson(
        request.courseSectionId,
        request.description,
        request.title,
        request.duration,
        request.index
      );
      const respone: ResponseBody<CreateCourseLessonRespone> = {
        data: createLesson,
        message: "Tạo lesson thành công",
        status: "success",
      };
      res.send(respone).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/update", async (req, res, next) => {
    try {
      const request: UpdateCourseLessonRequest = req.body;
      const _ = await courseLessonService.updateCourseLesson(request);

      const response: ResponseBody<UpdateCourseLessonRespone> = {
        data: [],
        message: "update course lesson success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/get-by-section", async (req, res, next) => {
    try {
      const request: GetCourseLessonBySectionRequest = req.body;
      const lesson = await courseLessonService.getCourseLessonBySectionId(
        request.courseSectionId
      );
      const respone: ResponseBody<GetCourseLessonBySectionRespone> = {
        data: lesson,
        message: "get all lesson success",
        status: "success",
      };
      res.send(respone).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
export default CourseLessonRounter;
