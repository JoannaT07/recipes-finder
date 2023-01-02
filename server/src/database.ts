import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        mongoose.set('toJSON', {
            virtuals: true,
            versionKey:false,
            transform: (doc, converted) => {
              delete converted._id;
            }
          });
        console.log("Connected to database")
    } catch (err) {
        console.log("Could not connect to database", err)
    }
}