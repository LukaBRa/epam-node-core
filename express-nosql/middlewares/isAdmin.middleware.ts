import { Request, Response, NextFunction } from "express";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {

    const currentUser = req.user;

    if(currentUser.role !== "admin") {
        return res.status(403).json({ error: "Only admins can delete carts." });
    }

    next();

}