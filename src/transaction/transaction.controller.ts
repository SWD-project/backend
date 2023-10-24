import bodyParser from "body-parser";
import { Router } from "express";
import { ResponseBody, errorResponse } from "../util/model/index.ts";

import { TransactionService } from "./transaction.service.ts";
import { CreateTransactionRequest, CreateTransactionResponse } from "../util/model/transaction/create-transaction.ts";
import { getAuthorization } from "../util/get-authorization.ts";
import { GetTransactionResponse } from "../util/model/transaction/get-transaction.ts";
import { UserService } from "../user/user.service.ts";



const TransactionRouter = Router();
TransactionRouter.use(bodyParser.json());

const transactionService = new TransactionService();
const userService = new UserService();

TransactionRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
})
  .post("/get", async (req, res, next) => {
    try {
      const uuid = getAuthorization(req);
      const transactions = await transactionService.getAll(uuid);
      
      const response: ResponseBody<GetTransactionResponse> = {
        data: transactions,
        message: "get transactions success",
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
        const id = await userService.getUserId(uuid);
        const request : CreateTransactionRequest = req.body;
        await transactionService.create(id, request.courseId, request.payment);
      
      const response: ResponseBody<CreateTransactionResponse> = {
        data: [],
        message: "create transaction successs",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error.message)).end();
    }
  })
  ;
export default TransactionRouter;