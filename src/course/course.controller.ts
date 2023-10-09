import bodyParser from "body-parser";
import { Router } from "express";
import { CourseService } from "./course.service";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { Course, CourseRespone } from "../util/model/course";
import {
  CreateCourseRequest,
  CreateCourseRespone,
} from "../util/model/course/create-course";
import { getAuthorization } from "../util/get-authorization.ts";

const CourseRounter = Router();
CourseRounter.use(bodyParser.json());

const courseService = new CourseService();

CourseRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .post("/", async (req, res, next) => {
    try {
      const listCourse = await courseService.getAllCourse();
      const response: ResponseBody<CourseRespone> = {
        data: listCourse,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/create-new-course", async (req, res, next) => {
    try {
      const courseData: CreateCourseRequest = req.body;
      const uuid = getAuthorization(req)
      const createdCourse = await courseService.createNewCourse(uuid, courseData);
        data: createdCourse,
        message: "Tạo khóa học thành công",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
export default CourseRounter;
