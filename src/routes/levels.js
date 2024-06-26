import express from "express"

import LevelController from "../controllers/Levels.js"
import { authentication } from "../middlewares/authentication.js"

export const levelRouter = express.Router()

levelRouter.post("/", LevelController.create)

levelRouter.get("/", LevelController.findAll)
levelRouter.get("/last", LevelController.findLast)
levelRouter.get("/:id", LevelController.findById)
levelRouter.get("/season/:id", LevelController.findAllBySeason)

levelRouter.put("/finish/:id", authentication, LevelController.finish)
levelRouter.put("/:id", LevelController.update)

levelRouter.delete("/:id", LevelController.delete)