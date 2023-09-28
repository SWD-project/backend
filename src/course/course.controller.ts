import bodyParser from "body-parser";
import { Router } from "express";
import { CourseService } from "./course.service";
import { ResponseBody, errorResponse } from "../util/model";
import { Course } from "../util/model/course";
import { CreateCourse } from "../util/model/course/create-course";

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
  })
  .post("/create-new-course", async (req, res, next) => {
    try {
      const courseData: CreateCourse = req.body;
      const createdCourse = await courseService.createNewCourse(courseData);
      const response: ResponseBody<CreateCourse> = {
        data: createdCourse,
        message: "Create course success",
        status: "success",
      };
      res.status(201).send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
export default CourseRounter;
// function post(
//   arg0: string,
//   arg1: (req: any, res: any, next: any) => Promise<void>
// ) {
//   throw new Error("Function not implemented.");
// }
