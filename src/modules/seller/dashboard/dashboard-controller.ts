import { Request, Response } from "express";

export const dashboard_GET = async (req: Request, res: Response) => {
    let seller = await prisma.seller.findUnique({ where: { userId: req.session.user.id } });
    if (!seller) {
        seller = await prisma.seller.create({ data: { userId: req.session.user.id } });
    }
    res.render("seller/dashboard/dashboard.html");
}