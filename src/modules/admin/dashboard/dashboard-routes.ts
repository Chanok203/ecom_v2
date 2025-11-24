import { Router } from "express";
import { dashboard_GET } from "./dashboard-controller";

const dashboardRouter = Router();

dashboardRouter.get(["/", "/dashboard"], dashboard_GET);

export default dashboardRouter;
