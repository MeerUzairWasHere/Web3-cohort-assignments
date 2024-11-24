import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
        process.exit(1);
    }
}