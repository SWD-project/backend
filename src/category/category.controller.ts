import bodyParser from "body-parser";
import { Router } from "express";

import { CategoryService } from "./category.service";
import { ResponseBody, errorResponse } from "../util/model";
import { Category } from "../util/model/category";
import { CreateCategoryRequest } from "../util/model/category/create-category";

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
  })

  //POST
  .post("/create-category", async (req, res, next) => {
    try {
      const createdCategoryRequest: CreateCategoryRequest = req.body;
      const listCategory = await categoryService.createCategory(
        createdCategoryRequest
      );
    } catch (error) {}
  });
export default CategoryRounter;
