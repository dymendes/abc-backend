import express from "express"

import LevelController from "../controllers/Levels.js"

export const levelRouter = express.Router()

levelRouter.post("/", LevelController.create)

levelRouter.get("/", LevelController.findAll)
levelRouter.get("/:id", LevelController.findById)

levelRouter.put("/:id", LevelController.update)

levelRouter.delete("/:id", LevelController.delete)