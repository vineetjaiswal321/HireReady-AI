import express from "express"
import { authUser } from "../middlewares/auth.middlewares.js"
import updateProfile from "../controllers/profile.controllers.js"

const profileRouter=express.Router()

profileRouter.put(
    "/profile",
    authUser,
    updateProfile
)


export default profileRouter