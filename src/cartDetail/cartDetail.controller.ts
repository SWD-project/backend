import bodyParser from "body-parser";
import { Router } from "express";
import { CartDetailService } from "./cartDetail.service.ts";
import { ResponseBody, errorResponse } from "../util/model/index.ts";
import { CartDetail } from "../util/model/cartDetail";
import { CreateCartDetailRequest, CreateCartDetailResponse } from "../util/model/cartDetail/create-cart-detail.ts";
import { getAuthorization } from "../util/get-authorization.ts";
import { DeleteCartDetailRequest, DeleteCartDetailResponse } from "../util/model/cartDetail/delete-cart-detail.ts";

const CartDetailRouter = Router();
CartDetailRouter.use(bodyParser.json());

const cartDetailService = new CartDetailService();

CartDetailRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})

.post("/", async (req, res, next) => {
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
})

.post("/create", async (req, res, next) => {
  try {
    const uuid = getAuthorization(req);
    console.log(uuid)
    const request: CreateCartDetailRequest = req.body;
    await cartDetailService.createCartDetail(uuid, request);
    const response: ResponseBody<CreateCartDetailResponse> = {
      data: [],
      message: "create cart detail success",
      status: "success",
    };
    res.send(response).end();
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
}
)

.post("/delete", async (req, res, next) => {
  try {
    const request: DeleteCartDetailRequest = req.body;

    await cartDetailService.delete(request.cartDetailId);
    const response: ResponseBody<DeleteCartDetailResponse> = {
      data: [],
      message: "delete cart detail success",
      status: "success",
    };
    res.send(response).end();
  } catch (error: any) {
    res.statusCode = 400;
    res.send(errorResponse(error.message)).end();
  }
})
;
export default CartDetailRouter;
