import express from "express";
import nunjucks from "nunjucks";
import authRouter from "./modules/admin/auth/auth-routes";
import dashboardRouter from "./modules/admin/dashboard/dashboard-routes";
import userRouter from "./modules/admin/user/user-routes";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

const app = express();

nunjucks.configure(path.join(__dirname, "..", "views"), {
  noCache: true,
  autoescape: true,
  express: app,
});

app.use(express.urlencoded());

app.use("/admin/auth", authRouter);
app.use("/admin/user", userRouter);
app.use("/admin", dashboardRouter);


app.listen(3000, "localhost", () => {
  console.log("SERVER IS RUNNING");
});
