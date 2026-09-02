import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );

        console.log("Mongoose connected successfully");
    } catch (error) {
        console.error("Error in db connection", error);
        throw error;
    }
};

export default connectDB;