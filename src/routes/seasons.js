import express from "express"

import SeasonController from "../controllers/Seasons.js"

export const seasonRouter = express.Router()

seasonRouter.post("/", SeasonController.create)

seasonRouter.get("/", SeasonController.findAll)
seasonRouter.get("/:id", SeasonController.findById)

seasonRouter.put("/:id", SeasonController.update)

seasonRouter.delete("/:id", SeasonController.delete)