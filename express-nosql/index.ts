import { connectToMongoDB } from "./config/database";
import { createApp } from "./app/app";
import http from "http";
import dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT;
const uri: string = process.env.MONGO_URI as string;

const server = http.createServer(createApp());

server.listen(PORT, async () => {
    try {
        if(await connectToMongoDB(uri)){
            console.log("Successfully connected to DB");
            console.log(`Server running at port ${PORT}`);
        } else {
            console.log("Failed to connect to DB, server will stop now.");
            server.close();
        }
    } catch (error) {
        console.error("Failed to connect to DB", error);
        server.close();
    }
    
});
