import bodyParser from "body-parser";
import { Router } from "express";
import { EnrolledCourseService } from "./enrolledCourse.service";
import { ResponseBody, errorResponse } from "../util/model";
import { EnrolledCourse } from "../util/model/enrolledCourse";
import { UserService } from "../user/user.service";
import { getAuthorization } from "../util/get-authorization";
import { GetEnrolledCourseResponse } from "../util/model/enrolledCourse/get-enrolled-course";

const EnrolledCourseRounter = Router();
EnrolledCourseRounter.use(bodyParser.json());

const enrolledCourseService = new EnrolledCourseService();
const userService = new UserService();

EnrolledCourseRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).post("/get", async (req, res) => {
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
});
