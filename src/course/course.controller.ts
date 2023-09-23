import bodyParser from "body-parser";
import { Router } from "express";
import { CourseService } from "./course.service";
import { ResponseBody, errorResponse } from "../model";
import { Course } from "../model/course";

const CourseRounter = Router();
CourseRounter.use(bodyParser.json());
const courseService = new CourseService();
CourseRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .get("/", async (req, res, next) => {
    try {
      const listCourse = await courseService.getAllCourse();
      const response: ResponseBody<Course> = {
        data: listCourse,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });

export default CourseRounter;
