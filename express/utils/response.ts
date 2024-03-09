import { Response } from "express";

export function response(res: Response, statusCode: number, data: any, error: any): void {
    
    let errorMessage = error === null ? null : { message: error };

    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ data: data, error: errorMessage }));
}