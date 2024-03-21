import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

export const connectToMongoDB = async (): Promise<boolean> => {

    try {
        await mongoose.connect(uri);
        return true
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        return false;
    }

}

export const closeMongoDBConnection = async (): Promise<Boolean> => {

    try {
        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.error("Failed to close database connection.", error);
        return false;
    }

} 