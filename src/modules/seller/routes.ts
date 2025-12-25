import { Router } from "express";
import dashboardRouter from "./dashboard/dashboard-routes";
import { isAuthenticated } from "../../core/middleware/auth-middleware";

const sellerRouter = Router();

sellerRouter.use(["/dashboard", ""], isAuthenticated, dashboardRouter)

export default sellerRouter;
