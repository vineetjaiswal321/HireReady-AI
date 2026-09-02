import { Router } from "express";
import { 
    registerUserController,
    loginUserController, 
    logoutUser, 
    getMe,
    forgotPasswordController,
    resetPasswordController,
    changePasswordController
    }
     from "../controllers/auth.controllers.js";
import { authUser } from "../middlewares/auth.middlewares.js";


const authRouter=Router()

authRouter.post("/register", registerUserController)

authRouter.post("/login", loginUserController)


authRouter.post("/logout", logoutUser)


authRouter.get("/get-me", authUser, getMe)


authRouter.post("/forgot-password", forgotPasswordController)


authRouter.post("/reset-password/:token", resetPasswordController)

authRouter.post("/change-password", authUser, changePasswordController)

export default authRouter;