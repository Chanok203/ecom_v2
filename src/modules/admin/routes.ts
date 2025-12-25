import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../core/middleware/auth-middleware";
import userRouter from "./user/user-routes";
import dashboardRouter from "./dashboard/dashboard-routes";

const adminRouter = Router();

adminRouter.use("/user", isAuthenticated, isAdmin, userRouter);
adminRouter.use(["/dashboard", ""], isAuthenticated, isAdmin, dashboardRouter);

export default adminRouter;