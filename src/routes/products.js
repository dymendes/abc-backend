import express from "express"

import ProductsController from "../controllers/Products.js"
import { authentication } from "../middlewares/authentication.js"

export const productRouter = express.Router()

productRouter.post("/", ProductsController.create)

productRouter.get("/", ProductsController.findAll)
productRouter.get("/:id", ProductsController.findById)

productRouter.put("/buy/:id", authentication, ProductsController.buy)
productRouter.put("/:id", ProductsController.update)

productRouter.delete("/:id", ProductsController.delete)