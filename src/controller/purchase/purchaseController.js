import Purchase from "../../model/purchaseModel.js";
import Song from "../../model/songModel.js";
import songController from "../../controller/song/songController.js";
import errors from "../../hellpers/errors.js";

/**
 * Obtiene todas las compras realizadas por un usuario específico.
 *
 * @async
 * @function getAllByUserId
 * @param {string|number} userId - El identificador único del usuario.
 * @throws {PURCHASE_CREATION_FAILED} Si no se encuentran compras para el usuario.
 * @returns {Promise<Array>} Retorna una lista de compras, incluyendo la información de las canciones asociadas.
 *
 * @example
 * try {
 *   const purchases = await getAllByUserId(1);
 *   console.log("Compras del usuario:", purchases);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
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

/**
 * Crea una nueva compra para un usuario y actualiza la cantidad de ventas de la canción.
 *
 * @async
 * @function createPurchase
 * @param {string|number} userId - El identificador único del usuario.
 * @param {string|number} songId - El identificador único de la canción.
 * @throws {SONG_NOT_FOUND} Si la canción especificada no existe.
 * @throws {PURCHASE_ALREADY_EXISTS} Si el usuario ya ha comprado la canción previamente.
 * @returns {Promise<Object>} Retorna la compra creada con su información.
 *
 * @example
 * try {
 *   const purchase = await createPurchase(1, 10);
 *   console.log("Compra realizada con éxito:", purchase);
 * } catch (error) {
 *   console.error("Error en la compra:", error.message);
 * }
 */
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
