import { Router } from "express";
import express from "express";
import paymentApiController from "../controller/payment/paymentApiController.js";

const router = Router();

// Ruta para crear un PaymentIntent
router.post("/intent", paymentApiController.createPaymentIntentApi);

export default router;
