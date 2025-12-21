import { Router } from "express";
import { createUser_GET, createUser_POST, deleteUser_POST, listUser_GET } from "./user-controller";


const userRouter = Router();

userRouter.get("/createuser", createUser_GET);
userRouter.post("/createuser", createUser_POST);
userRouter.post("/:userId/delete", deleteUser_POST);
userRouter.get("", listUser_GET);

export default userRouter;