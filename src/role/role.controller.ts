import bodyParser from "body-parser";
import { Router } from "express";
import { RoleService } from "./role.service.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { Role } from "../util/model/role/index.ts";
import {
  CreateRoleRequest,
  CreateRoleRespone,
} from "../util/model/role/create.ts";
import {
  UpdateRoleRequest,
  UpdateRoleRespone,
} from "../util/model/role/update-role.ts";

const RoleRounter = Router();
RoleRounter.use(bodyParser.json());
const roleService = new RoleService();
RoleRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/get-all-role", async (req, res, next) => {
    try {
      const listRole = await roleService.getAllRole();
      const response: ResponseBody<Role> = {
        data: listRole,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/create-role", async (req, res, next) => {
    try {
      const request: CreateRoleRequest = req.body;
      const createRole = await roleService.createRole(request.name);
      const respone: ResponseBody<CreateRoleRespone> = {
        data: createRole,
        message: "Tạo lesson thành công",
        status: "success",
      };
      res.send(respone).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  .post("/update-role", async (req, res, next) => {
    try {
      const request: UpdateRoleRequest = req.body;
      const update = await roleService.updateRole(request._id, request.name);
      const respone: ResponseBody<UpdateRoleRespone> = {
        data: [],
        message: "update role success",
        status: "success",
      };
      res.send(respone).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
export default RoleRounter;
