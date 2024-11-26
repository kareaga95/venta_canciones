import Song from "../model/songModel.js";
import Artist from "../model/artistModel.js";
import { Op } from "sequelize";

async function getAll(req, res) {
    console.log("entra");
    try {
        const { visible, search, genre, artistName } = req.query; // Extraer filtros de la query

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
        const songs = await Song.findAll({
            where: whereClause,
            include: [
                {
                    model: Artist,
                    as: "artist",
                    where: Object.keys(artistWhereClause).length > 0 ? artistWhereClause : undefined, // Incluye filtros de artista si hay
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

        // Responder con las canciones como JSON
        res.status(200).json(songs.map((song) => song.toJSON()));
    } catch (error) {
        console.error("Error en getAll:", error);
        res.status(500).json({ error: "Error al obtener las canciones." });
    }
}

async function getAllByArtistId(req, res) {
    try {
        const artistId = parseInt(req.params.artistId); // Obtener el ID del artista
        const { visible, search, genre, artistName } = req.query; // Extraer filtros de la query

        const whereClause = {};
        const artistWhereClause = {};

        whereClause.artist_id = artistId; // Filtrar canciones por artista

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
        const songs = await Song.findAll({
            
            where: whereClause,
            include: [
                {
                    model: Artist,
                    as: "artist",
                    where: Object.keys(artistWhereClause).length > 0 ? artistWhereClause : undefined, // Incluye filtros de artista si hay
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

        // Responder con las canciones como JSON
        res.status(200).json(songs.map((song) => song.toJSON()));
    } catch (error) {
        console.error("Error en getAll:", error);
        res.status(500).json({ error: "Error al obtener las canciones." });
    }
}

export const functions = { getAll, getAllByArtistId };

export default functions;
