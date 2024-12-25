import artistModel from "../../model/artistModel.js";
import error from "../../hellpers/errors.js";
import songController from "../../controller/song/songController.js";
import songModel from "../../model/songModel.js"; 

/**
 * Obtiene todos los artistas registrados.
 *
 * @async
 * @function getAllArtists
 * @throws {ARTISTS_NOT_FOUND} Si no se encuentran artistas en la base de datos.
 * @returns {Promise<Array>} Retorna una lista de artistas.
 *
 * @example
 * try {
 *   const artists = await getAllArtists();
 *   console.log("Lista de artistas:", artists);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
async function getAllArtists() {
    const artists = await artistModel.findAll();
    if(!artists){
        throw new error.ARTISTS_NOT_FOUND();
    }
    return artists;
}

/**
 * Obtiene un artista específico a partir del ID de usuario.
 *
 * @async
 * @function getArtistByUserId
 * @param {string|number} userId - Identificador único del usuario.
 * @returns {Promise<Object|null>} Devuelve el artista encontrado o null si no existe.
 *
 * @example
 * const artist = await getArtistByUserId(1);
 * console.log("Artista encontrado:", artist);
 */
async function getArtistByUserId(userId) {
    return artistModel.findOne({ where: { user_id: userId } });
}

/**
 * Obtiene un artista específico a partir de su ID.
 *
 * @async
 * @function getArtistById
 * @param {string|number} id - Identificador único del artista.
 * @returns {Promise<Object|null>} Devuelve el artista encontrado o null si no existe.
 *
 * @example
 * const artist = await getArtistById(1);
 * console.log("Artista encontrado:", artist);
 */
async function getArtistById(id) {
    return artistModel.findByPk(id);
}

/**
 * Crea un nuevo artista con un nombre y un ID de usuario.
 *
 * @async
 * @function createArtist
 * @param {string|number} userId - Identificador único del usuario.
 * @param {string} name - Nombre del artista.
 * @throws {ARTIST_USER_ID_ALREADY_EXISTS_ERROR} Si el ID de usuario ya está registrado.
 * @throws {ARTIST_NAME_ALREADY_EXISTS_ERROR} Si el nombre del artista ya existe.
 * @returns {Promise<Object>} Devuelve el artista creado.
 *
 * @example
 * try {
 *   const artist = await createArtist(1, "Nuevo Artista");
 *   console.log("Artista creado:", artist);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
async function createArtist(userId, name) {
    const existingArtistName = await artistModel.findOne({where: {name: name}});
    const existingUserId = await artistModel.findOne({where: {user_id: userId}});
    if(existingUserId){
        throw new error.ARTIST_USER_ID_ALREADY_EXISTS_ERROR;
    }
    if(existingArtistName){
        throw new error.ARTIST_NAME_ALREADY_EXISTS_ERROR;
    }
    return artistModel.create({user_id: userId, name});
}

/**
 * Actualiza el nombre de un artista específico.
 *
 * @async
 * @function updateArtist
 * @param {string|number} id - Identificador único del artista.
 * @param {string} name - Nuevo nombre del artista.
 * @throws {ARTIST_NAME_ALREADY_EXISTS_ERROR} Si el nombre del artista ya existe.
 * @returns {Promise<Object>} Retorna el artista actualizado.
 *
 * @example
 * try {
 *   const updatedArtist = await updateArtist(1, "Nuevo Nombre");
 *   console.log("Artista actualizado:", updatedArtist);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
async function updateArtist(id, name) {
    const artist = await artistModel.findByPk(id);
    const existingArtistName = await artistModel.findOne({where: {name: name}});

    if(existingArtistName) {
        throw new error.ARTIST_NAME_ALREADY_EXISTS_ERROR;
    }

    songApiController.
    artist.name = name;
    await artist.save();
    return artist;
}

/**
 * Actualiza el estado activo/inactivo de un artista y las visibilidades de sus canciones.
 *
 * @async
 * @function updateArtistStatus
 * @param {string|number} id - Identificador único del artista.
 * @param {boolean} active - Nuevo estado del artista (true: activo, false: inactivo).
 * @returns {Promise<Object>} Retorna el artista con su estado actualizado.
 *
 * @example
 * try {
 *   const updatedArtist = await updateArtistStatus(1, false);
 *   console.log("Estado del artista actualizado:", updatedArtist);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
async function updateArtistStatus(id, active) {
    const artist = await artistModel.findByPk(id);
    const artistsSongs = await songController.getSongsByArtistId(id);
    if(artistsSongs){
            for (const song of artistsSongs) {
                song.visible = active;
                await song.save();
            }
    }
    
    artist.active = active;
    artist.updated_date = new Date();
    await artist.save();
    return artist;
}

export const functions = { getAllArtists,getArtistByUserId, createArtist, updateArtist, updateArtistStatus, getArtistById };

export default functions;