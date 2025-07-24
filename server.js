import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import cors from "cors";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import morgan from "morgan";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const PROD_URL = process.env.PROD_URL;


// 1
const whitelist = ["http://localhost:3000", PROD_URL];
// 2
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



// middle ware//
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes//

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

 db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost: ${PORT}`));
});