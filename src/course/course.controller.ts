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
import { UpdateRatingCourseRequest, UpdateRatingCourseResponse } from "../util/model/course/update-rating-course.ts";
import { ActiveCourseRequest, ActiveCourseResponse } from "../util/model/course/active-course.ts";
import { UpdateCourseRequest, UpdateCourseResponse } from "../util/model/course/update-course.ts";
import { UserService } from "../user/user.service.ts";
import { GetCourseByLectureRequest, GetCourseByLectureResponse } from "../util/model/course/get-course-lecture.ts";

const CourseRounter = Router();
CourseRounter.use(bodyParser.json());

const courseService = new CourseService();
const userService = new UserService();

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
      console.log(request)
      const courses = await courseService.search(request);
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
  })

  .post("/update-rating", async (req, res, next) => {
    try {
      const request: UpdateRatingCourseRequest = req.body;
      const _ = await courseService.updateRating(request.courseId, request.rating);
      const response: ResponseBody<UpdateRatingCourseResponse> = {
        data: [],
        message: "update rating success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/update", async (req, res, next) => {
    try {
      const request: UpdateCourseRequest = req.body;
      const data = await courseService.update(request);

      const response: ResponseBody<UpdateCourseResponse> = {
        data: [],
        message: "update course success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/active", async (req, res, next) => {
    try {
      const request : ActiveCourseRequest = req.body;
      await courseService.updateStatus(request.courseId);

      const response: ResponseBody<ActiveCourseResponse> = {
        data: [],
        message: "update status success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/get-by-lecture", async (req, res, next) => {
    try {
      const lectureId = await userService.getUserId(getAuthorization(req));
      const request: GetCourseByLectureRequest = req.body;
      const page = request.page || 1;
      const limit = request.limit || 5;

      const courses = await courseService.getCourseByLecture (lectureId, page, limit);

      const response: ResponseBody<GetCourseByLectureResponse> = {
        data: courses,
        message: "get course success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  ;
export default CourseRounter;
