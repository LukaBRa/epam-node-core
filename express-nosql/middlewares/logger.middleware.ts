import { Request, Response, NextFunction } from "express";
import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const logger = createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: format.combine(
        format.timestamp({ format: 'ddd, DD MMM YYYY HH:mm:ss' }),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()} ${info.message}`)
      ),
    transports: [
        new transports.Console()
    ]
})

export function logData(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on("finish", () => {
        const requestDuration = Date.now() - start;
        logger.info(`${req.method} ${req.url} - ${requestDuration} ms`);
    });
    next();
}