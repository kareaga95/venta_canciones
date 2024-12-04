import Purchase from "../../model/purchaseModel.js";
import Song from "../../model/songModel.js";
import songController from "../../controller/song/songController.js";
import errors from "../../hellpers/errors.js";

async function getAllByUserId(userId) {
    const purchases = await Purchase.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Song,
                as: "song",
            },
        ],
    });

    if (!purchases || purchases.length === 0) {
        throw new errors.PURCHASE_CREATION_FAILED();
    }

    return purchases;
}

async function createPurchase(userId, songId) {
    const song = await Song.findByPk(songId);

    if (!song) {
        throw new errors.SONG_NOT_FOUND();
    }

    const existingPurchase = await Purchase.findOne({
        where: { user_id: userId, song_id: songId },
    });

    if (existingPurchase) {
        throw new errors.PURCHASE_ALREADY_EXISTS();
    }

    const sales_amount = song.sales_amount + 1;

    await songController.updateSong(song.id, song.title, song.price, song.genre, sales_amount);

    const purchase = await Purchase.create({
        user_id: userId,
        song_id: songId,
        purchase_date: new Date(),
    });

    return purchase;
}

export const functions = {
    getAllByUserId,
    createPurchase,
};

export default functions;
