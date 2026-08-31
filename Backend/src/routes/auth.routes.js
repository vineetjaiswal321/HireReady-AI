import { Router } from "express";
import { registerUserController, loginUserController, logoutUser, getMe } from "../controllers/auth.controllers.js";
import { authUser } from "../middlewares/auth.middlewares.js";


const authRouter=Router()

authRouter.post("/register", registerUserController)

authRouter.post("/login", loginUserController)


authRouter.post("/logout", logoutUser)


authRouter.get("/get-me", authUser, getMe)

export default authRouter;