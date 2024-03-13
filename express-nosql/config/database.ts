import mongoose from "mongoose";

export const connectToMongoDB = async (uri: string): Promise<void> => {

    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }

}

export const closeMongoDBConnection = async (): Promise<void> => {

    try {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Failed to close database connection.", error);
    }

} 