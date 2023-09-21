import bodyParser from "body-parser";
import { Router } from "express";
import { UserService } from "./user.service.ts";
import { ResponseBody, errorResponse } from "../util/model";
import { User } from "../util/model/user/index.ts";

const UserRouter = Router();
UserRouter.use(bodyParser.json());

const userService = new UserService();

UserRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const listUser = await userService.getUserById(id);
    const response: ResponseBody<User> = {
      data: listUser,
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
});

export default UserRouter;
