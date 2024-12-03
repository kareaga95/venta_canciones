import songController from "./songController.js";
import artistController from "../artist/artistController.js";


async function getAllSongs(req, res) {
    try {
        const songs = await songController.getAllSongs(req.query);
        res.status(200).json(songs.map((song) => song.toJSON()));
    } catch (error) {
        console.error("Error en getAll:", error);
        res.status(500).json({ error: "Error al obtener las canciones." });
    }
}

async function getSongsByArtistId(req, res) {
    const userId = req.userId;
    console.log("USER ID: " + userId);
    const artistId = await artistController.getArtistByUserId(userId).then((artist) => artist.id);
    try {
        const songs = await songController.getSongsByArtistId(artistId, req.query);
        res.status(200).json(songs.map((song) => song.toJSON()));
    } catch (error) {
        console.error("Error en getSongsByArtistId:", error);
        res.status(500).json({ error: "Error al obtener las canciones del artista." });
    }
}

async function getSongById(req, res) {
    try {
        const songId = parseInt(req.params.id);
        const song = await songController.getSongById(songId);
        if (!song) {
            res.status(404).json({ error: "Canción no encontrada." });
        } else {
            res.status(200).json(song.toJSON());
        }
    }
    catch (error) {
        console.error("Error en getSongById:", error);
        res.status(500).json({ error: "Error al obtener la canción." });
    }
}

async function createSong(req, res) {
    const userId = req.userId;
    const artist_id = await artistController.getArtistByUserId(userId).then((artist) => artist.id);
    req.body.artist_id = artist_id;
    try {
        const newSong = await songController.createSong(req.body, req.files);
        res.status(201).json(newSong.toJSON());
    } catch (error) {
        console.error("Error en create:", error);
        res.status(500).json({ error: "Error al subir la canción." });
    }
}

async function updateSong(req, res) {
    try {
        const { title, price, genre } = req.body;
        const updatedSong = await songController.updateSong(req.params.id, title, price, genre);
        if (!updatedSong) {
            res.status(404).json({ error: "Canción no encontrada." });
        } else {
            res.status(200).json(updatedSong.toJSON());
        }
    } catch (error) {
        console.error("Error en update:", error);
        res.status(500).json({ error: "Error al actualizar la canción." });
    }
}

async function deleteSong(req, res) {
    const userId = req.userId;
    try {
        const deletedSong = await songController.deleteSong(req.params.id);

        if (!deletedSong) {
            res.status(404).json({ error: "Canción no encontrada." });
        } else {
            res.status(204).send();
        }
    } catch (error) {

    }
}

export const songApiController = { getAllSongs, getSongsByArtistId, createSong, getSongById, updateSong, deleteSong };

export default songApiController;
