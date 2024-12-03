import Song from "../../model/songModel.js";
import Artist from "../../model/artistModel.js";
import { Op } from "sequelize";
import fs from 'fs';

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

async function getSongById(id) {
    const song = await Song.findByPk(id);
    return song;

}

async function createSong(data, files) {
    const coverImage = files["coverImage"]?.[0];
    const audioFile = files["audioFile"]?.[0]; 7
    console.log("DATAAAAAAAA " + data.title)

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

async function updateSong(id, title, price, genre, sales_amount) {
    const song = await Song.findByPk(id);
    if (!song) {
        throw new Error("Cancion no encontrada");
    }
    song.title = title;
    song.price = price;
    song.genre = genre;
    song.sales_amount = sales_amount;

    return await song.save();
}

async function deleteSong(id) {
    const song = await Song.findByPk(id);
    if (!song) {
        throw new Error("Cancion no encontrada");
    }

    const paths = [song.cover_image, song.audio_file_path];
    paths.forEach(path => {
        fs.unlink(path, (err) => {
            if (err) {
                console.log("ERROR UNLINK");
                console.error(err);
                return;
            }
            console.log('File deleted successfully');
        });
    });
    console.log("UNLINK END");
    return await song.destroy();
}

export const functions = { getAllSongs, getSongsByArtistId, createSong, getSongById, updateSong, deleteSong };

export default functions;
