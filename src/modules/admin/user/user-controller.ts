import { Request, Response } from "express";
import { createUser } from "./user-service";

export const createUser_GET = (req: Request, res: Response) => {
  res.render("admin/user/create-user.html");
};

export const createUser_POST = async (req: Request, res: Response) => {
  const { username, password, confirmPassword, isAdmin } = req.body;
  const role = "ADMIN" === isAdmin ? "ADMIN" : "BUYER";

  let errors: any = {};
  let data: any = {};

  // username -> a-z0-9_
  const username_regex = /^[a-z0-9_]+$/;
  const usernameLower = username.toLowerCase();
  if (!username_regex.test(usernameLower)) {
    errors.username = "invalid username";
  } else {
    data.username = username;
  }

  // password -> a-zA-Z0-9_-*!@#$%^
  const password_regex = /^[A-Za-z0-9@$!%*?&_-]{4,}$/;
  if (password !== confirmPassword) {
    errors.password = "password != confirm password";
  } else if (password.length < 4) {
    errors.password = "password must be more than 4 chars";
  } else if (!password_regex.test(password)) {
    errors.password = "invalid password";
  }

  if ("username" in errors || "password" in errors) {
    res.render("admin/user/create-user.html", { errors: errors, data: data });
  }

  try {
    const user = await createUser(username, password, role);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    errors = error.message;
    data.username = username;
    res.render("admin/user/create-user.html", { errors: errors, data: data });
  }
};

export const listUser_GET = async (req: Request, res: Response) => {
  // TODO:
  // 1. query all user from db via prisma
  // 2. clean user for table

  const userList = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  res.render("admin/user/list-user.html", {
    userList: userList,
  });
};

export const deleteUser_POST = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    await prisma.user.delete({ where: { id: userId } });
    if (req.session.user.id === userId) {
      return res.redirect("/admin/auth/logout");
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/user");
};
