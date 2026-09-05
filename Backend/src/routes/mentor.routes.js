import { Router } from "express";
import { authUser } from "../middlewares/auth.middlewares.js";
import { chatWithCareerMentor } from "../controllers/mentor.controllers.js";


const mentorRouter=Router();

mentorRouter.post("/chat", authUser, chatWithCareerMentor)


export default mentorRouter;