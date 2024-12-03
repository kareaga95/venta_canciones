import {Router} from 'express';
import purchaseApiController from "../controller/purchase/purchaseApiController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

    router.post("/new", isAuthenticated, purchaseApiController.createPurchase);

    router.get("/user", isAuthenticated, purchaseApiController.getAllByUserId);


export default router;