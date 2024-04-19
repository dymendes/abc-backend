import express from "express"

import ResponsibleController from "../controllers/Responsibles.js"

export const responsibleRouter = express.Router()

responsibleRouter.get("/", ResponsibleController.findAll)