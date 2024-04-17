import express from "express"

import StudentController from "../controllers/Student.js"
import { authentication } from "../middlewares/authentication.js"

export const studentRouter = express.Router()

studentRouter.get("/", authentication, StudentController.profile)