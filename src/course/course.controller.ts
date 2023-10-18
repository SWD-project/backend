import bodyParser from "body-parser";
import { Router } from "express";
import { CourseService } from "./course.service.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import {
  CreateCourseRequest,
  CreateCourseRespone,
} from "../util/model/course/create-course";
import { getAuthorization } from "../util/get-authorization.ts";
import {
  SearchCourseRequest,
  SearchCourseResponse,
} from "../util/model/course/search-course.ts";
import {
  GetCourseRequest,
  GetCourseResponse,
} from "../util/model/course/get-course.ts";

const CourseRounter = Router();
CourseRounter.use(bodyParser.json());

const courseService = new CourseService();

CourseRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/create-new-course", async (req, res, next) => {
    try {
      const courseData: CreateCourseRequest = req.body;
      const uuid = getAuthorization(req);
      const createdCourse = await courseService.createNewCourse(
        uuid,
        courseData
      );

      const response: ResponseBody<CreateCourseRespone> = {
        data: createdCourse,
        message: "Tạo khóa học thành công",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/search", async (req, res, next) => {
    try {
      const request: SearchCourseRequest = req.body;
      const title = request.title;
      const page = request.page || 1;
      const pageSize = request.limit || 5;

      const courses = await courseService.search(title, page, pageSize);

      const response: ResponseBody<SearchCourseResponse> = {
        data: courses,
        message: "Search success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/get-a-course", async (req, res, next) => {
    try {
      const request: GetCourseRequest = req.body;
      const _course = await courseService.getCourseById(request.courseId);
      const response: ResponseBody<GetCourseResponse> = {
        data: _course,
        message: "Get a course success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
export default CourseRounter;
