import bodyParser from "body-parser";
import { Router, response } from "express";

import { CategoryService } from "./category.service.ts";

import { Category } from "../util/model/category/index.ts";
import { CreateCategoryRequest, CreateCategoryResponse } from "../util/model/category/create-category.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { GetCategoryResponse } from "../util/model/category/get-category.ts";

const CategoryRounter = Router();
CategoryRounter.use(bodyParser.json());

const categoryService = new CategoryService();

CategoryRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})

  
  .post("/get", async (req, res, next) => {
    try {
      const listCategory = await categoryService.getCategory();
      const response: ResponseBody<GetCategoryResponse> = {
        data : listCategory,
        message: "get category success",
        status: "success"
      }
      res.send(response).end();
    } catch (error : any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/create", async (req, res, next) => {
    try {
      const createdCategoryRequest: CreateCategoryRequest = req.body;
      const createdCategory = await categoryService.createCategory(
        createdCategoryRequest
      );

      const response: ResponseBody<CreateCategoryResponse> = {
        data : createdCategory,
        message: "create category success",
        status: "success"
      }
      res.send(response).end();
    } catch (error : any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/delete/:name", async (req, res, next) => {
    try {
      const nameToDelete = req.params.name;
      await categoryService.deleteCategory(nameToDelete);
    
      const response: ResponseBody<any> = {
        data : [],
        message: "delete category success",
        status: "success"
      }
      res.send(response).end();
    } catch (error : any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  ;
  
export default CategoryRounter;
