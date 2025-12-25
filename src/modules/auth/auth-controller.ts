import { Request, Response } from "express";
import { verifyPassword } from "../../core/utils/hash";
import { isAdmin } from "../../core/middleware/auth-middleware";

export const login_GET = (req: Request, res: Response) => {
  res.render("auth/login.html");
};

export const login_POST = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let errors: any = {};
  let data: any = { username: username };

  const user = await prisma.user.findUnique({ where: { username: username } });
  if (!user) {
    errors.message = "invalid username or password";
    // errors.message = "username not found";
    res.render("auth/login.html", { errors: errors, data: data });
    return;
  }

  const isvalid = await verifyPassword(password, user.passwordHash);
  if (!isvalid) {
    errors.message = "invalid username or password";
    // errors.message = "invalid password";
    res.render("auth/login.html", { errors: errors, data: data });
    return;
  }
  const userData = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  const nextPage: string = req.query.next ? `${req.query.next}` : "/seller";
  req.session.user = userData;
  req.session.save(() => {
    res.redirect(nextPage);
  }); 
};

export const logout_GET = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
};

