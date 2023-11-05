import bodyParser from "body-parser";
import { Router } from "express";
import { CompleteCourseService } from "./completeCourse.service.ts";
import { getAuthorization } from "../util/get-authorization.ts";
import { UserService } from "../user/user.service.ts";
import { CreateCompleteCourseRequest } from "../util/model/completeCourse/create-complete-course.ts";
import { GetCompletedCourseRepsone } from "../util/model/completeCourse/get-complete-course.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";

const CompleteCourseRouter = Router();
CompleteCourseRouter.use(bodyParser.json());
const completeCourseService = new CompleteCourseService();
const userService = new UserService();
CompleteCourseRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/", async (req, res, next) => {
    try {
      const listCompleteCourse =
        await completeCourseService.getAllCompleteCourse();
      const response: ResponseBody<GetCompletedCourseRepsone> = {
        data: listCompleteCourse,
        message: "Get All complete course success",
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
      const id = await userService.getUserId(uuid);
      const request: CreateCompleteCourseRequest = req.body;
      await completeCourseService.create(id, request.courseId);
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/get", async (req, res, next) => {
    const uuid = getAuthorization(req);

    const id = await userService.getUserId(uuid);
    const completeCourse: any = await completeCourseService.getAll(id);
    const response: ResponseBody<GetCompletedCourseRepsone> = {
      data: completeCourse,
      message: "get transactions success",
      status: "success",
    };
    res.send(response).end();
  });
export default CompleteCourseRouter;
