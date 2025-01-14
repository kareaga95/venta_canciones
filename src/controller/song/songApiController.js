import songController from "./songController.js";
import artistController from "../artist/artistController.js";
import errors from "../../hellpers/errors.js";

async function getAllSongs(req, res) {
    try {
        const songs = await songController.getAllSongs(req.query);
        res.status(200).json(songs.map((song) => song.toJSON()));
    } catch (err) {
        console.error("Error en getAllSongs:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function getSongsByArtistId(req, res) {
    try {
        const artistId = parseInt(req.params.artistId);
        const songsByArtist = await songController.getSongsByArtistId(artistId);
        res.status(200).json(songsByArtist.map((song) => song.toJSON()));
    } catch (err) {
        console.error("Error en getSongsByArtistId:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function getSongById(req, res) {
    try {
        const songId = parseInt(req.params.id);
        const song = await songController.getSongById(songId);
        if (!song) {
            throw new errors.SONG_NOT_FOUND();
        }
        res.status(200).json(song.toJSON());
    } catch (err) {
        console.error("Error en getSongById:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function createSong(req, res) {
    try {
        const userId = req.userId;
        const artist = await artistController.getArtistByUserId(userId);
        if (!artist) {
            throw new errors.ARTIST_PERMISSIONS_ERROR();
        }
        if(artist.active === 0){
            throw new errors.ARTIST_NOT_ACTIVE_ERROR();
        }
        req.body.artist_id = artist.id;
        const newSong = await songController.createSong(req.body, req.files);
        res.status(201).json(newSong.toJSON());
    } catch (err) {
        console.error("Error en createSong:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function updateSong(req, res) {
    try {
        const { title, price, genre, sales_amount } = req.body;

        const updatedSong = await songController.updateSong(req.params.id, title, price, genre, sales_amount);
        if (!updatedSong) {
            throw new errors.SONG_NOT_FOUND();
        }

        res.status(200).json(updatedSong.toJSON());
    } catch (err) {
        console.error("Error en updateSong:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function deleteSong(req, res) {
    try {
        const songId = req.params.id;
        const deletedSong = await songController.deleteSong(songId);
        if (!deletedSong) {
            throw new errors.SONG_NOT_FOUND();
        }
        res.status(200).json({ message: "Canción eliminada con éxito" });
    } catch (err) {
        console.error("Error en deleteSong:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function downloadSong(req, res) {
    try {
        const userId = req.userId;
        const songId = parseInt(req.params.id);

        const { filePath, fileName } = await songController.downloadSong(userId, songId);
        
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("Error al descargar el archivo:", err);
                res.status(500).json({ error: "Error al procesar la descarga" });
            }
        });
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

export const songApiController = {
    getAllSongs,
    getSongsByArtistId,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
    downloadSong,
};

export default songApiController;
