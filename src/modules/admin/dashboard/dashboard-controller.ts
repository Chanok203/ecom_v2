import { Request, Response } from "express";

export const dashboard_GET = (req: Request, res: Response) => {
    res.render("admin/dashboard/dashboard.html");
}