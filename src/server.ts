import express from "express";
import nunjucks from "nunjucks";
import authRouter from "./modules/admin/auth/auth-routes";
import dashboardRouter from "./modules/admin/dashboard/dashboard-routes";
import userRouter from "./modules/admin/user/user-routes";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import { isAuthenticated } from "./core/middleware/auth-middleware";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

import "./core/prisma";

const app = express();

nunjucks.configure(path.join(__dirname, "..", "views"), {
  noCache: true,
  autoescape: true,
  express: app,
});

app.use("/static", express.static(path.join(__dirname, "..", "static")))

app.use(express.urlencoded());
app.use(session({
  secret: process.env["SECRET_KEY"],
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: false,
  rolling: true,
}));

app.use("/admin/auth", authRouter);
app.use("/admin/user", isAuthenticated, userRouter);
app.use("/admin", isAuthenticated, dashboardRouter);

app.listen(3000, "localhost", () => {
  console.log("SERVER IS RUNNING");
});
