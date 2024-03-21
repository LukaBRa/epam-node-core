import { connectToMongoDB } from "./config/database";
import { createApp } from "./app/app";
import http from "http";
import dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT || 8000;

const server = http.createServer(createApp());

let connections: any[] = [];

server.listen(PORT, async () => {
    try {
        if(await connectToMongoDB()){
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

server.on("connection", (connection) => {
    connections.push(connection)

    connection.on("close", () => {
        connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
});

function shutDown() {
    server.close(() => {
        console.log("Closed remaining connections.");
        process.exit(0);
    });
    setTimeout(() => {
        console.error("Could not close connections in time, force shut down.");
        process.exit(1);
    }, 20000);

    connections.forEach((connection) => connection.end());
    setTimeout(() => {
        connections.forEach((connection) => connection.destroy());
    }, 10000);
}

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);