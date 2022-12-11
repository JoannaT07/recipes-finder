import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL!)
        console.log("Database connected", db.connection.name)
    } catch (err) {
        console.log(err)
    }
}

