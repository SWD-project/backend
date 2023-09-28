import bodyParser from "body-parser";
import { Router } from "express";
import { CourseSectionService } from "./courseSection.service";
import { ResponseBody, errorResponse } from "../util/model";
import { CourseSection } from "../util/model/courseSection";

const CourseSectionRounter = Router();
CourseSectionRounter.use(bodyParser.json());
const courseSectionService = new CourseSectionService();
CourseSectionRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .post("/", async (req, res, next) => {
    try {
      const listCourseSection = await courseSectionService.getAllCourse();
      const response: ResponseBody<CourseSection> = {
        data: listCourseSection,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
