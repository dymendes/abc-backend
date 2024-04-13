import express from "express"

import AuthenticationController from "../controllers/AuthenticationController.js"

export const authenticationRouter = express.Router()

authenticationRouter.post("/", AuthenticationController.signup)