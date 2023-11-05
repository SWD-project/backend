import bodyParser from "body-parser";
import { Router } from "express";
import { CourseSectionService } from "./courseSection.service.ts";

import { CourseSection } from "../util/model/courseSection";
import {
  CreateCourseSectionRequest,
  CreateCourseSectionRespone,
} from "../util/model/courseSection/create-section.ts";
import {
  UpdateCourseSectionRequest,
  UpdateCourseSectionRespone,
} from "../util/model/courseSection/update-section.ts";
import { CourseService } from "../course/course.service.ts";
import {
  GetCourseSectionRequest,
  GetCourseSectionResponr,
} from "../util/model/courseSection/get-course-section";
import { ResponseBody, errorResponse } from "../util/model/index.ts";

const CourseSectionRounter = Router();
CourseSectionRounter.use(bodyParser.json());
const courseSectionService = new CourseSectionService();
const courseService = new CourseService();
CourseSectionRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .post("/create-section", async (req, res, next) => {
    try {
      const request: CreateCourseSectionRequest = req.body;
      await courseSectionService.create(
        request.timeComplete,
        request.courseId,
        request.title,
        request.description
      );
      const response: ResponseBody<CreateCourseSectionRespone> = {
        data: [],
        message: "create course section success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/update-section", async (req, res, next) => {
    try {
      const request: UpdateCourseSectionRequest = req.body;
      const updateSection = await courseSectionService.update(request);
      const response: ResponseBody<UpdateCourseSectionRespone> = {
        data: [],
        message: "update section success",
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
      const request: GetCourseSectionRequest = req.body;
      const section = await courseSectionService.getAllCourseSection(
        request.courseId
      );
      const respone: ResponseBody<GetCourseSectionResponr> = {
        data: section,
        message: "get all section success",
        status: "success",
      };
      res.send(respone).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
export default CourseSectionRounter;
