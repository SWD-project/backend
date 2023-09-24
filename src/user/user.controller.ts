import bodyParser from "body-parser";
import { Request, Router } from "express";
import { UserService } from "./user.service.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { User } from "../util/model/user/index.ts";
import { getAuthorization } from "../util/get-authorization.ts";
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from "../util/model/user/update-user.ts";

const UserRouter = Router();
UserRouter.use(bodyParser.json());

const userService = new UserService();

UserRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/get-user-by-uuid", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);
      const listUser = await userService.getUserByUuid(uuid);
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
  })
  .post("/get-user-by-id/:id", async (req, res, next) => {
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
  })

  .post("/update-user", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);
      const updateUser: UpdateUserRequest = req.body;
      const count = await userService.updateUserByUuid(uuid, updateUser);
      const response: ResponseBody<UpdateUserResponse> = {
        data: [],
        message: count ? "Delete success" : "Update success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/create-user", async (req, res, next) => {
    try {
      const createUserRequest = req.body;
      const createdUser = await userService.createNewUser(createUserRequest);

      if (createdUser) {
        const response: ResponseBody<User> = {
          data: [createdUser],
          message: "Create user success",
          status: "success",
        };
        res.status(201).json(response);
      } else {
        res.status(400).json(errorResponse("Không thể tạo người dùng."));
      }
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  });

export default UserRouter;
