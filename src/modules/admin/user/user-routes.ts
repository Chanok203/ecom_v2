import { Router } from "express";
import { createUser_GET, createUser_POST, listUser_GET } from "./user-controller";


const userRouter = Router();

userRouter.get("/createuser", createUser_GET);
userRouter.post("/createuser", createUser_POST);
userRouter.get("", listUser_GET);

export default userRouter;