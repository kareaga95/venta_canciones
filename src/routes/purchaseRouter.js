import {Router} from 'express';
import purchaseApiController from "../controller/purchase/purchaseApiController.js";

const router = Router();

    router.post("new", purchaseApiController.createPurchase);
    router.get("/:id", purchaseApiController.getAllByUserId);


export default router;