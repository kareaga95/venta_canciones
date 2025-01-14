import Song from "../../model/songModel.js";
import Artist from "../../model/artistModel.js";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import error from "../../hellpers/errors.js";
import Purchase from "../../model/purchaseModel.js";

/**
 * Obtiene todas las canciones aplicando filtros opcionales.
 *
 * @async
 * @function getAllSongs
 * @param {Object} filters - Objeto con los filtros aplicables.
 * @param {string} [filters.visible] - Filtra canciones visibles ("true") u ocultas ("false").
 * @param {string} [filters.search] - Filtra por título de la canción.
 * @param {string} [filters.genre] - Filtra por género.
 * @param {string} [filters.artistName] - Filtra por nombre del artista.
 * @returns {Promise<Array>} Devuelve una lista de canciones con sus respectivos artistas.
 * 
 * @example
 * const filters = { visible: "true", search: "love", genre: "pop" };
 * const songs = await getAllSongs(filters);
 * console.log(songs);
 */
async function getAllSongs(filters) {
    const { visible, search, genre, artistName } = filters;
    const whereClause = {};
    const artistWhereClause = {};

    if (visible !== undefined) {
        whereClause.visible = visible === "true";
    }

    if (search) {
        whereClause.title = { [Op.like]: `%${search}%` };
    }

    if (genre) {
        whereClause.genre = genre;
    }

    if (artistName) {
        artistWhereClause.name = { [Op.like]: `%${artistName}%` };
    }

    const today = new Date();
    whereClause.release_date = { [Op.lte]: today };

    return await Song.findAll({
        where: whereClause,
        include: [
            {
                model: Artist,
                as: "artist",
                where: Object.keys(artistWhereClause).length > 0 ? artistWhereClause : undefined,
                attributes: ["id", "name"],
            },
        ],
        attributes: ["id", "title", "genre", "price", "audio_file_path", "cover_image", "visible", "release_date"],
        order: [["release_date", "DESC"]],
    });
}



/**
 * Obtiene todas las canciones asociadas a un artista específico.
 *
 * @async
 * @function getSongsByArtistId
 * @param {string|number} artistId - Identificador único del artista.
 * @throws {USER_NOT_FOUND} Si no se proporciona un ID de artista válido.
 * @throws {SONG_NOT_FOUND} Si no se encuentran canciones para el artista.
 * @returns {Promise<Array>} Retorna una lista de canciones asociadas al artista.
 * 
 * @example
 * const songs = await getSongsByArtistId(123);
 * console.log(songs);
 */
async function getSongsByArtistId(artistId) {
    if (!artistId) {
        throw new error.USER_NOT_FOUND();
    }
    const songs = await Song.findAll({ where: { artist_id: artistId } });
    if(!songs){
        throw new error.SONG_NOT_FOUND();
    }

    return songs;
}

/**
 * Obtiene una canción específica por su ID.
 *
 * @async
 * @function getSongById
 * @param {string|number} id - Identificador único de la canción.
 * @throws {SONG_NOT_FOUND} Si no se encuentra la canción.
 * @returns {Promise<Object>} Devuelve el objeto de la canción encontrada.
 * 
 * @example
 * const song = await getSongById(1);
 * console.log(song);
 */
async function getSongById(id) {
    const song = await Song.findByPk(id);
    if (!song) {
        throw new error.SONG_NOT_FOUND();
    }
    return song;
}

/**
 * Crea una nueva canción con la información y archivos proporcionados.
 *
 * @async
 * @function createSong
 * @param {Object} data - Datos de la canción.
 * @param {Object} files - Archivos subidos.
 * @param {Object} files.coverImage - Archivo de imagen de portada.
 * @param {Object} files.audioFile - Archivo de audio de la canción.
 * @returns {Promise<Object>} Retorna la canción creada.
 * 
 * @example
 * const data = { title: "New Song", genre: "Pop", price: 10 };
 * const files = { coverImage: file1, audioFile: file2 };
 * const song = await createSong(data, files);
 * console.log(song);
 */
async function createSong(data, files) {
    const coverImage = files["coverImage"]?.[0];
    const audioFile = files["audioFile"]?.[0];

    return await Song.create({
        artist_id: data.artist_id,
        title: data.title,
        genre: data.genre,
        price: data.price,
        audio_file_path: audioFile?.path,
        file_size: audioFile?.size,
        file_type: audioFile?.mimetype,
        cover_image: coverImage?.path,
        visible: data.visible,
        release_date: data.release_date,
    });
}

/**
 * Actualiza la información de una canción específica.
 *
 * @async
 * @function updateSong
 * @param {string|number} id - Identificador único de la canción.
 * @param {string} title - Nuevo título de la canción.
 * @param {number} price - Nuevo precio de la canción.
 * @param {string} genre - Nuevo género de la canción.
 * @param {number} sales_amount - Nueva cantidad de ventas de la canción.
 * @throws {SONG_NOT_FOUND} Si no se encuentra la canción.
 * @returns {Promise<Object>} Devuelve la canción actualizada.
 * 
 * @example
 * const updatedSong = await updateSong(1, "Updated Title", 15, "Rock", 100);
 * console.log(updatedSong);
 */
async function updateSong(id, title, price, genre, sales_amount) {
    const song = await Song.findByPk(id);
    if (!song) {
        throw new error.SONG_NOT_FOUND();
    }
    song.title = title;
    song.price = price;
    song.genre = genre;
    song.sales_amount = sales_amount;
    return await song.save();
}

/**
 * Elimina una canción específica y sus archivos asociados.
 *
 * @async
 * @function deleteSong
 * @param {string|number} id - Identificador único de la canción.
 * @throws {SONG_NOT_FOUND} Si no se encuentra la canción.
 * @throws {FILE_PROCESSING_ERROR} Si ocurre un error al eliminar los archivos.
 * @returns {Promise<Object>} Retorna la confirmación de la eliminación.
 * 
 * @example
 * await deleteSong(1);
 * console.log("Canción eliminada con éxito.");
 */
async function deleteSong(id) {
    const song = await Song.findByPk(id);
    if (!song) {
        throw new error.SONG_NOT_FOUND();
    }
    const paths = [song.cover_image, song.audio_file_path];
    paths.forEach((path) => {
        fs.unlink(path, (err) => {
            if (err) {
                console.error("Error al eliminar el archivo:", err);
                throw new error.FILE_PROCESSING_ERROR();
            }
        });
    });
    return await song.destroy();
}

/**
 * Permite descargar el archivo de audio de una canción comprada por un usuario.
 *
 * @async
 * @function downloadSong
 * @param {string|number} userId - Identificador único del usuario.
 * @param {string|number} songId - Identificador único de la canción.
 * @throws {NO_USERS_SONG} Si el usuario no ha comprado la canción.
 * @throws {SONG_NOT_FOUND} Si no se encuentra la canción.
 * @throws {FILE_NOT_FOUND} Si el archivo no existe en el sistema.
 * @returns {Promise<Object>} Devuelve la ruta y el nombre del archivo a descargar.
 * 
 * @example
 * const { filePath, fileName } = await downloadSong(1, 10);
 * console.log(`Descargar archivo: ${fileName} en ${filePath}`);
 */
async function downloadSong(userId, songId) {
    const song = await Song.findByPk(songId);
    console.log("User: " + userId + " Song: " + songId);
    
    const userPurchasedSong = await Purchase.findOne({where: {user_id: userId, song_id: songId}})
    if(!userPurchasedSong){
    throw new error.NO_USERS_SONG;
    }
    if (!song) {
        throw new error.SONG_NOT_FOUND();
    }

    const filePath = song.audio_file_path;

    if (!fs.existsSync(filePath)) {
        throw new error.FILE_NOT_FOUND();
    }

    return {
        filePath,
        fileName: path.basename(filePath),
    };
}

export const functions = { getAllSongs, getSongById, createSong, updateSong, deleteSong, getSongsByArtistId, downloadSong };

export default functions;
