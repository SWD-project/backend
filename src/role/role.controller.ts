import bodyParser from "body-parser";
import { Router } from "express";
import { RoleService } from "./role.service";
import { ResponseBody, errorResponse } from "../util/model";
import { Role } from "../util/model/role";

const RoleRounter = Router();
RoleRounter.use(bodyParser.json());
const roleService = new RoleService();
RoleRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).post("/", async (req, res, next) => {
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
});
