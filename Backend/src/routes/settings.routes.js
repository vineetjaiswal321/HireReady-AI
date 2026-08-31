import { Router } from "express"
import { getSetting, updateSettings } from "../controllers/settings.controllers.js"
import { authUser } from "../middlewares/auth.middlewares.js";


const settingsRouter=Router();

settingsRouter
.route("/")
.get(authUser, getSetting)
.patch(authUser, updateSettings);

export default settingsRouter;