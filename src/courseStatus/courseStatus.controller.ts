import bodyParser from "body-parser";
import { Router } from "express";

import { CourseStatusService } from "./courseStatus.service";
import { CourseStatus } from "../util/model/courseStatus";
import { ResponseBody, errorResponse } from "../util/model";

const CourseStatusRounter = Router();
CourseStatusRounter.use(bodyParser.json());
CourseStatusRounter;
const courseStatusService = new CourseStatusService();
CourseStatusRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const listCourseStatus =
        await courseStatusService.getCourseStatusById(id);
      const response: ResponseBody<CourseStatus> = {
        data: listCourseStatus,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });

export default CourseStatusRounter;
