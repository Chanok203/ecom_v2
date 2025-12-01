import { Request, Response } from "express";
import { prisma } from "../../../core/prisma";
import { verifyPassword } from "../../../core/utils/hash";

export const login_GET = (req: Request, res: Response) => {
  res.render("admin/auth/login.html");
};

export const login_POST = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let errors: any = {}
  let data: any = { username: username }

  // TODO
  // 1. validate username and password
  // 2. session (storage)

  const user = await prisma.user.findUnique({ where: { username: username } });
  if (!user) {
    errors.message = "invalid username or password";
    // errors.message = "username not found";
    res.render("admin/auth/login.html", { errors: errors, data: data })
    return;
  }

  const isvalid = await verifyPassword(password, user.passwordHash);
  if (!isvalid) {
    errors.message = "invalid username or password";
    // errors.message = "invalid password";
    res.render("admin/auth/login.html", { errors: errors, data: data })
    return;
  }
  const userData = {
    username: user.username,
    role: user.role,
  }
  req.session.user = userData
  res.redirect("/admin");
};
