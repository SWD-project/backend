import bodyParser from "body-parser";
import { Router } from "express";
import { CartDetailService } from "./cartDetail.service";
import { ResponseBody, errorResponse } from "../util/model";
import { CartDetail } from "../util/model/cartDetail";

const CartDetailRouter = Router();
CartDetailRouter.use(bodyParser.json());
const cartDetailService = new CartDetailService();
CartDetailRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
}).post("/", async (req, res, next) => {
  try {
    const listCartDetail = await cartDetailService.getAllCartDetail();
    const response: ResponseBody<CartDetail> = {
      data: listCartDetail,
      message: "Get All success",
      status: "success",
    };
    res.send(response).end();
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
});
