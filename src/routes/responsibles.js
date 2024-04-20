import express from "express"

import ResponsibleController from "../controllers/Responsibles.js"

export const responsibleRouter = express.Router()

responsibleRouter.get("/", ResponsibleController.findAll)
responsibleRouter.get("/:id", ResponsibleController.findById)

responsibleRouter.put("/:id", ResponsibleController.update)

responsibleRouter.delete("/:id", ResponsibleController.delete)