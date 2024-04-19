import express from "express"

import StudentController from "../controllers/Students.js"
import { authentication } from "../middlewares/authentication.js"

export const studentsRouter = express.Router()

studentsRouter.get("/", authentication, StudentController.profile)