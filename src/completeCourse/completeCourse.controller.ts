import bodyParser from "body-parser";
import { Router } from "express";
import { CompleteCourseService } from "./completeCourse.service";
import { ResponseBody, errorResponse } from "../util/model";
import { CompleteCourse } from "../util/model/completeCourse";

const CompleteCourseRouter = Router();
CompleteCourseRouter.use(bodyParser.json());
const completeCourseService = new CompleteCourseService();
CompleteCourseRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).post("/", async (req, res, next) => {
  try {
    const listCompleteCourse =
      await completeCourseService.getAllCompleteCourse();
    const response: ResponseBody<CompleteCourse> = {
      data: listCompleteCourse,
      message: "Get All complete course success",
      status: "success",
    };
    res.send(response).end();
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
});
