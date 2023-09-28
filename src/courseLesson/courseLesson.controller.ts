import { Router } from "express";
import { CourseLessonService } from "./courseLesson.service";
import bodyParser from "body-parser";
import { ResponseBody, errorResponse } from "../util/model";
import { CourseLesson } from "../util/model/courseLesson";

const CourseLessonRounter = Router();
CourseLessonRounter.use(bodyParser.json());
const courseService = new CourseLessonService();
CourseLessonRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).post("/", async (req, res, next) => {
  try {
    const listCourseLesson = await courseService.getAllCourseLesson();
      const response: ResponseBody<CourseLesson> = {
        data: listCourseLesson,
        message: "Get all success",
        status: "success",
      };
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
});
