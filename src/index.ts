import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import connectDB from "./connection/index.ts";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const hostname = "https://drawdemy.onrender.com";
// const hostname = "localhost"
app.use(cors());

app.use(morgan("dev"));
console.log(__dirname);
app.use(express.static(__dirname + "/public"));
app.use("/", (req, res, next) => {
  res.statusCode = 200;
  res.set("Content-Type", "text/html")
  res.end("hello");
});
// connectDB();
const server = createServer(app);

server.listen(hostname, () => {
  console.log(`Server running at http://${hostname}`);
});
