import bodyParser from "body-parser";
import { Router } from "express";
import { EnrolledCourseService } from "./enrolledCourse.service.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import {
  CreateEnrolledCourseRequest,
  CreateEnrolledCourseResponse,
} from "../util/model/enrolledCourse/create-enrolled-course.ts";
import { UserService } from "../user/user.service.ts";
import { getAuthorization } from "../util/get-authorization.ts";
import { GetEnrolledCourseResponse } from "../util/model/enrolledCourse/get-enrolled-course";
import { CheckEnrolledRequest, CheckEnrolledResponse } from "../util/model/enrolledCourse/check-enrolled.ts";

const EnrolledCourseRounter = Router();
EnrolledCourseRounter.use(bodyParser.json());

const enrolledCourseService = new EnrolledCourseService();
const userService = new UserService();
EnrolledCourseRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/get", async (req, res) => {
    try {
      const uid = getAuthorization(req);

      const id = await userService.getUserId(uid);
      const courseList: any =
        await enrolledCourseService.getAllEnrolledCourseByStudentId(id);

      const response: ResponseBody<GetEnrolledCourseResponse> = {
        data: courseList,
        message: "get enrolled course success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/create", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);
      const userId = await userService.getUserId(uuid);
      const request: CreateEnrolledCourseRequest = req.body;

      await enrolledCourseService.create(userId, request.courseId);

      const response: ResponseBody<CreateEnrolledCourseResponse> = {
        data: [],
        message: "create enrolled course success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/get-by-course", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);
      const userId = await userService.getUserId(uuid);
      const request: CheckEnrolledRequest = req.body;

      const enrolledCourse = await enrolledCourseService.getByStudentIdAndCourseId(userId, request.courseId);

      const response: ResponseBody<CheckEnrolledResponse> = {
        data: enrolledCourse,
        message: "get enrolled course success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  ;

export default EnrolledCourseRounter;
