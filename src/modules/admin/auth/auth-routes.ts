import { Router } from "express";
import { login_GET, login_POST } from "./auth-controller";

const authRouter = Router();

authRouter.get("/login", login_GET);
authRouter.post("/login", login_POST);

export default authRouter;
