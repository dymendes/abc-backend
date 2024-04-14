import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import { authenticationRouter } from "./routes/authentication.js"
import { studentRouter } from "./routes/student.js"

dotenv.config()

mongoose.connect(process.env.DATABASE_HOST).then(() => console.log("Connected to the database!"))

export const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/authentication", authenticationRouter)
app.use("/student", studentRouter)