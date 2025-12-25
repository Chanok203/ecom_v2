import { Router } from "express";
import { login_GET, login_POST, logout_GET } from "./auth-controller";

const authRouter = Router();

authRouter.get("/login", login_GET);
authRouter.post("/login", login_POST);
authRouter.get("/logout", logout_GET);

export default authRouter;
