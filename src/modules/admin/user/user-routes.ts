import { Router } from "express";
import { createUser_GET, createUser_POST } from "./user-controller";


const userRouter = Router();

userRouter.get("/createuser", createUser_GET);
userRouter.post("/createuser", createUser_POST);

export default userRouter;