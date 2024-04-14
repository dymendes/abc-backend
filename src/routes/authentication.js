import express from "express"

import AuthenticationController from "../controllers/AuthenticationController.js"
import { authentication } from "../middlewares/authentication.js"

export const authenticationRouter = express.Router()

authenticationRouter.post("/signup", AuthenticationController.signup)
authenticationRouter.post("/signin", AuthenticationController.signin)

authenticationRouter.get("/", authentication, (req, res) => res.json({ session: req.session }))