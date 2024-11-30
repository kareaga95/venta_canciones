import songController from "./songController.js";

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
    try {
        const artistId = parseInt(req.params.artistId);
        const songs = await songController.getSongsByArtistId(artistId, req.query);
        res.status(200).json(songs.map((song) => song.toJSON()));
    } catch (error) {
        console.error("Error en getSongsByArtistId:", error);
        res.status(500).json({ error: "Error al obtener las canciones del artista." });
    }
}

async function createSong(req, res) {
    try {
        const newSong = await songController.createSong(req.body, req.files);
        res.status(201).json(newSong.toJSON());
    } catch (error) {
        console.error("Error en create:", error);
        res.status(500).json({ error: "Error al subir la canción." });
    }
}

export const songApiController = { getAllSongs, getSongsByArtistId, createSong };

export default songApiController;
