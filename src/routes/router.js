import { Router } from "express";
import songRouter from "./songRouter.js";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import purchaseRouter from "./purchaseRouter.js";
import artistRouter from "./artistRouter.js";

const router = Router();

router.use("/songs", songRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/purchases", purchaseRouter);
router.use("/artists", artistRouter);

export default router;