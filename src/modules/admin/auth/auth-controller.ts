import { Request, Response } from "express";

export const login_GET = (req: Request, res: Response) => {
  res.render("admin/auth/login.html");
};

export const login_POST = (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send(`USERNAME: ${username}, PASSWORD: ${password}`);
};
