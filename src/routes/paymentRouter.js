import { Router } from "express";
import express from "express";
import paymentApiController from "../controller/payment/paymentApiController.js";

const router = Router();

router.post("/intent", paymentApiController.createPaymentIntentApi);

export default router;
