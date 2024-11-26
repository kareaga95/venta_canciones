import { Router } from "express";
import songRouter from "./songRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/songs", songRouter);
router.use("/users", userRouter);

export default router;