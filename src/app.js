import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//through this method[express()] all the props will transfer to this app

// app.use(cors())
// app.use() is used for set middleware and other configuration

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
export { app };
