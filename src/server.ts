import express from "express";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

import "./core/prisma";
import { sessionStore } from "./core/session";
import adminRouter from "./modules/admin/routes";
import authRouter from "./modules/auth/auth-routes";

const app = express();

nunjucks.configure(path.join(__dirname, "..", "views"), {
  noCache: true,
  autoescape: true,
  express: app,
});

app.use("/static", express.static(path.join(__dirname, "..", "static")))

app.use(express.urlencoded());
app.use(session({
  store: sessionStore,
  secret: process.env["SECRET_KEY"],
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: false,
  rolling: true,
}));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.listen(3000, "localhost", () => {
  console.log("SERVER IS RUNNING");
});
