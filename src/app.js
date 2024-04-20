import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import { authenticationRouter } from "./routes/authentication.js"
import { studentsRouter } from "./routes/students.js"
import { responsibleRouter } from "./routes/responsibles.js"
import { seasonRouter } from "./routes/seasons.js"
import { levelRouter } from "./routes/levels.js"

dotenv.config()

mongoose.connect(process.env.DATABASE_HOST).then(() => console.log("Connected to the database!"))

export const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/authentication", authenticationRouter)

app.use("/students", studentsRouter)
app.use("/seasons", seasonRouter)

app.use("/levels", levelRouter)
app.use("/responsibles", responsibleRouter)