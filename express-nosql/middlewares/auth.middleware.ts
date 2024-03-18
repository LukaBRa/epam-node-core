import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ICurrentUser } from "../types/ICurrentUser";

dotenv.config();

export async function auth(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: "User is not authorized." });
    }

    const [tokenType, token] = authHeader.split(' ');

    if(tokenType !== "Bearer") {
        return res.status(403).send("You must be authorized user.");
    }

    try{

        const user = jwt.verify(token, process.env.TOKEN_KEY!) as ICurrentUser;

        req.user = user;

    } catch (error) {
        return res.status(401).json({ error: "User is not authorized." });
    }

    return next();

}