import express from "express"

import PaymentController from "../controllers/Payments.js"

export const paymentRouter = express.Router()

paymentRouter.post("/process_payment", PaymentController.create)