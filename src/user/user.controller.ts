import bodyParser from "body-parser";
import { Router } from "express";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { ResponseBody, errorResponse } from "../util/model";
import { User } from "../util/model/user";

const UserRouter = Router();
UserRouter.use(bodyParser.json());

const userService = new UserService();

UserRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).get("/", (req, res, next) => {
  try {
    const response: ResponseBody<User> = {
      data: [],
      message: "Get success",
      status: "success",
    };
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
});
