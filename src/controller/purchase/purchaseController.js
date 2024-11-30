import Purchase from "../../model/purchaseModel.js";
import Song from "../../model/songModel.js";

async function getAllByUserId(userId) {
    const purchases = await Purchase.findAll({
        where: {user_id: userId},
        include:[
            {
                model: Song,
                as: "song"
            }
        ]

    });
    return purchases;
}

async function createPurchase(userId, songId) {
    const song = await Song.findByPk(songId);

    if (!song) {
        throw new Error("Song not found");
    }

    const existingAdminPurchase = await Purchase.findOne({
        where: {user_id: userId, song_id: songId}
    });

    if (existingAdminPurchase) {
        throw new Error("Purchase already exists");
    }
    
    const purchase = await Purchase.create({
        user_id: userId,
        song_id: songId,
        purchase_date: new Date()
    });

    return purchase;
}

export const functions = {
    getAllByUserId,
    createPurchase,
 };

 export default functions;