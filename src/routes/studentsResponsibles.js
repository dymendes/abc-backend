import express from "express"

import StudentsResponsiblesController from "../controllers/StudentsResponsibles.js"

export const studentsResponsiblesRouter = express.Router()

studentsResponsiblesRouter.get("/:id", StudentsResponsiblesController.findStudentsByResponsible)