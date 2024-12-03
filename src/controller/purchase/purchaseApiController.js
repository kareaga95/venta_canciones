import purchaseController from "./purchaseController.js";

async function getAllByUserId(req, res) {
    const userId = req.userId;
    try {
        const purchases = await purchaseController.getAllByUserId(userId);
        res.status(200).json(purchases);
    } catch (error) {
        console.error("Error en getAllPurchases:", error);
        res.status(500).json({ error: "Error al obtener las compras." });
    }
}

async function createPurchase(req, res) {

    const userId = req.userId;
    const { songId } = req.body;
    console.log("Creando compra para el usuario:", userId, "con canción:", songId);
    try {
        const newPurchase = await purchaseController.createPurchase(userId, songId);
        res.status(201).json(newPurchase);
    } catch (error) {
        console.error("Error en createPurchase:", error);
        res.status(500).json({ error: "Error al crear la compra." });
    }
}

export const functions = {
    getAllByUserId,
    createPurchase,
}

export default functions;
