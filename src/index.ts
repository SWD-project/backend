import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import connectDB from "./repository/connection/index.ts";
import cors from "cors";
import pageRouter from "./controller/page/index.ts";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const hostname = "localhost";
const port = 5000;

app.use(cors());

app.use(morgan("dev"));
console.log(__dirname)
app.use(express.static(__dirname + '/public'));
app.use("/", (req,res)=> {
res.end("heelo")
})
//connectDB();
const server = createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
