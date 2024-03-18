import mongoose from "mongoose";

export const connectToMongoDB = async (uri: string): Promise<boolean> => {

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