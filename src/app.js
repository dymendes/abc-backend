import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { connection } from "./database/connection.js"

import { authenticationRouter } from "./routes/authentication.js"
import { studentsRouter } from "./routes/students.js"
import { responsibleRouter } from "./routes/responsibles.js"
import { seasonRouter } from "./routes/seasons.js"
import { levelRouter } from "./routes/levels.js"
import { productRouter } from "./routes/products.js"
import { paymentRouter } from "./routes/payment.js"

dotenv.config()

await connection()

export const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/authentication", authenticationRouter)
app.use("/students", studentsRouter)
app.use("/seasons", seasonRouter)
app.use("/levels", levelRouter)
app.use("/responsibles", responsibleRouter)
app.use("/products", productRouter)
app.use("/payment", paymentRouter)