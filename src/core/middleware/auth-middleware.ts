import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
        return next();
    }

    res.redirect(`/auth/login?next=${req.originalUrl}`);
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        return next();
    }
    res.status(403).send("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
}
