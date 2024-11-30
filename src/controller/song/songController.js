import Song from "../../model/songModel.js";
import Artist from "../../model/artistModel.js";
import { Op } from "sequelize";

async function getAllSongs(filters) {
    const { visible, search, genre, artistName } = filters;

    const whereClause = {};
    const artistWhereClause = {};

    // Filtro por visibilidad
    if (visible !== undefined) {
        whereClause.visible = visible === "true"; // Convertir string a boolean
    }

    // Filtro por búsqueda de título
    if (search) {
        whereClause.title = { [Op.like]: `%${search}%` }; // Buscar coincidencias parciales
    }

    // Filtro por género
    if (genre) {
        whereClause.genre = genre;
    }

    // Filtro por nombre de artista
    if (artistName) {
        artistWhereClause.name = { [Op.like]: `%${artistName}%` };
    }

    // Consultar canciones desde la base de datos
    return await Song.findAll({
        where: whereClause,
        include: [
            {
                model: Artist,
                as: "artist",
                where: Object.keys(artistWhereClause).length > 0 ? artistWhereClause : undefined,
                attributes: ["id", "name"], // Atributos necesarios de artistas
            },
        ],
        attributes: [
            "id",
            "title",
            "genre",
            "price",
            "audio_file_path",
            "cover_image",
            "visible",
            "release_date",
        ],
    });
}

async function getSongsByArtistId(artistId, filters) {
    const { visible, search, genre } = filters;

    const whereClause = { artist_id: artistId }; // Filtrar canciones por artista
    if (visible !== undefined) {
        whereClause.visible = visible === "true";
    }
    if (search) {
        whereClause.title = { [Op.like]: `%${search}%` };
    }
    if (genre) {
        whereClause.genre = genre;
    }

    return await Song.findAll({
        where: whereClause,
        include: [
            {
                model: Artist,
                as: "artist",
                attributes: ["id", "name"],
            },
        ],
        attributes: [
            "id",
            "title",
            "genre",
            "price",
            "audio_file_path",
            "cover_image",
            "visible",
            "sales_amount",
            "release_date",
        ],
    });
}

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

export const functions = { getAllSongs, getSongsByArtistId, createSong };

export default functions;
