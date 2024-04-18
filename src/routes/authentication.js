import express from "express"

import AuthenticationController from "../controllers/Authentication.js"

export const authenticationRouter = express.Router()

authenticationRouter.post("/signup", AuthenticationController.signup)
authenticationRouter.post("/signin", AuthenticationController.signin)