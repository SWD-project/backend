import bodyParser from "body-parser";
import { Router } from "express";
import { CartService } from "./cart.service";
import { ResponseBody, errorResponse } from "../util/model";
import { Cart } from "../util/model/cart";

const CartRounter = Router();
CartRounter.use(bodyParser.json());
const cartService = new CartService();
CartRounter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  //GET
  .post("/", async (req, res, next) => {
    try {
      const listCart = await cartService.getAllCart();
      const response: ResponseBody<Cart> = {
        data: listCart,
        message: "Get all success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  });
