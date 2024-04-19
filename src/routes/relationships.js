import express from "express"

import StudentsResponsiblesController from "../controllers/StudentsResponsibles.js"

export const relationshipsRouter = express.Router()

relationshipsRouter.get("/students-by-responsible/:id", StudentsResponsiblesController.findStudentsByResponsible)
relationshipsRouter.get("/responsible-by-student/:id", StudentsResponsiblesController.findResponsibleByStudent)