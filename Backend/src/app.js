import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


//require all routes
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.rotes.js";
import profileRouter from "./routes/profile.routes.js";
import settingsRouter from "./routes/settings.routes.js";


app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/users/", profileRouter)
app.use("/api/v1/settings", settingsRouter)


export default app;