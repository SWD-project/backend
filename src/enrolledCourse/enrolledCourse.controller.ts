import bodyParser from "body-parser";
import { Router } from "express";
import { EnrolledCourseService } from "./enrolledCourse.service";
import { ResponseBody, errorResponse } from "../util/model";
import { EnrolledCourse } from "../util/model/enrolledCourse";

const EnrolledCourseRounter = Router();
EnrolledCourseRounter.use(bodyParser.json());
const enrolledCourseService = new EnrolledCourseService();
EnrolledCourseRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).post("/", async (req, res, next) => {
  try {
    const listEnrolledCourse =
      await enrolledCourseService.getAllEnrolledCourse();
    const response: ResponseBody<EnrolledCourse> = {
      data: listEnrolledCourse,
      message: "Get all success",
      status: "success",
    };
    res.send(response).end();
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
});
