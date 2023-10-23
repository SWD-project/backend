import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import connectDB from "./util/connection/index.ts";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import UserRouter from "./user/user.controller.ts";
import CategoryRounter from "./category/category.controller.ts";
import CourseRounter from "./course/course.controller.ts";
import CartRounter from "./cart/cart.controller.ts";
import CartDetailRouter from "./cartDetail/cartDetail.controller.ts";
import TransactionRouter from "./transaction/transaction.controller.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
// const hostname = "localhost"
app.use(cors());

app.use(morgan("dev"));
console.log(__dirname);
app.use(express.static(__dirname + "/public"));

app.use("/user", UserRouter);
app.use("/category", CategoryRounter)
app.use("/course", CourseRounter)
app.use("/cart", CartRounter)
app.use("/cart-detail", CartDetailRouter)
app.use("/transaction", TransactionRouter)
connectDB();

const server = createServer(app);

server.listen(5000, () => {
  console.log(`Server running`);
});
