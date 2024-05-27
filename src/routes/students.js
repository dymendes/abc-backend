import express from "express"

import StudentController from "../controllers/Students.js"
import { authentication } from "../middlewares/authentication.js"

export const studentsRouter = express.Router()

studentsRouter.get("/", authentication, StudentController.findAll)
studentsRouter.get("/:id", StudentController.findById)

studentsRouter.put("/:id", StudentController.update)

studentsRouter.delete("/:id", StudentController.delete)