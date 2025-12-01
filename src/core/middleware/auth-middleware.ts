import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.render("admin/auth/login.html", { errors: { message: "Please login" } });
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

}
