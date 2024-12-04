import Song from "../../model/songModel.js";
import Artist from "../../model/artistModel.js";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import error from "../../hellpers/errors.js";
import Purchase from "../../model/purchaseModel.js";

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
    });
}

async function getSongsByArtistId(artistId) {
    console.log("ID ARTISTA: ", artistId);
    if (!artistId) {
        throw new error.USER_NOT_FOUND();
    }
    const songs = await Song.findAll({ where: { artist_id: artistId } });
    if(!songs){
        throw new error.SONG_NOT_FOUND();
    }

    return songs;
}

async function getSongById(id) {
    const song = await Song.findByPk(id);
    if (!song) {
        throw new error.SONG_NOT_FOUND();
    }
    return song;
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

async function downloadSong(userId, songId) {
    const song = await Song.findByPk(songId);
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
