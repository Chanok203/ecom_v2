import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
        return next();
    }
    
    res.redirect(`/admin/auth/login?next=${req.originalUrl}`);
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

}
