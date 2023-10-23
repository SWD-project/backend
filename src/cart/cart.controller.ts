import bodyParser from "body-parser";
import { Router } from "express";
import { CartService } from "./cart.service.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { Cart } from "../util/model/cart";
import { getAuthorization } from "../util/get-authorization.ts";
import { CreateCartResponse } from "../util/model/cart/create-cart.ts";
import { GetCartResponse } from "../util/model/cart/get-cart.ts";

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
  })

  .post("/create", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);


      await cartService.createCart(uuid);
      const response: ResponseBody<CreateCartResponse> = {
        data: [],
        message: "create cart success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })

  .post("/get-a-cart", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);

      const cart = await cartService.getCartWithCartDetail(uuid);
      const response: ResponseBody<GetCartResponse> = {
        data: cart,
        message: "get cart success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  ;
export default CartRounter;
