import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import connectDB from "./util/connection/index.ts";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import UserRouter from "./user/user.controller.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
// const hostname = "localhost"
app.use(cors());

app.use(morgan("dev"));
console.log(__dirname);
app.use(express.static(__dirname + "/public"));

app.use("/", (req, res) => {
  res.end("hello");
});

app.use("/user", UserRouter);
connectDB();

const server = createServer(app);

server.listen(3000, () => {
  console.log(`Server running`);
});
