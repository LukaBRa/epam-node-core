import { Request, Response } from "express";
import { connectToMongoDB, closeMongoDBConnection } from "../config/database";

export class HealthController {

    static async checkHealth (req: Request, res: Response) {
        try {
            if(await connectToMongoDB()) {
                res.status(200).json({ message: "Application is healthy." });
                closeMongoDBConnection();
            } 
            return res.status(500).send('Error connecting to database');
        } catch (error) {
            console.error("Failed to connect to mongodb.", error);
        }
        
    }

}