import purchaseController from "./purchaseController.js";
import errors from "../../hellpers/errors.js";

async function getAllByUserId(req, res) {
    const userId = req.userId;
    try {
        const purchases = await purchaseController.getAllByUserId(userId);
        res.status(200).json(purchases);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function createPurchase(req, res) {
    const userId = req.userId;
    const { songId } = req.body;
    try {
        const newPurchase = await purchaseController.createPurchase(userId, songId);
        res.status(201).json(newPurchase);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

export const functions = {
    getAllByUserId,
    createPurchase,
};

export default functions;
