import bodyParser from "body-parser";
import { Router } from "express";

import { ResponseBody, errorResponse } from "../model";
import { CategoryService } from "./category.service";
import { Category } from "../model/category";

const CategoryRounter = Router();
CategoryRounter.use(bodyParser.json());
CategoryRounter;
const categoryService = new CategoryService();
CategoryRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const listCategory = await categoryService.getCategoryById(id);
      const response: ResponseBody<Category> = {
        data: listCategory,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });

export default CategoryRounter;
