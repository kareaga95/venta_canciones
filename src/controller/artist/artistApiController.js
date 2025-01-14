import artistController from "../../controller/artist/artistController.js";

// Maneja los errores y responde con un estado 500 y el mensaje de error
function handleError(res, error) {
    res.status(500).json({ error: error.message });
}

async function getAllArtists(req, res) {
    try {
        const artists = await artistController.getAllArtists();
        res.status(200).json(artists);
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

async function getArtistById(req, res) {
    try {
        const { id } = req.params;
        const artist = await artistController.getArtistById(id);
        if (!artist) {
            return res.status(404).json({ error: "Artista no encontrado" });
        }
        res.status(200).json(artist);
    } catch (error) {
        console.error("Error obteniendo el artista:", error);
        res.status(500).json({ error: "Error al obtener el artista." });
    }
}


async function getArtistByUserId(req, res) {
    const userId = req.userId;
    try {
        const artist = await artistController.getArtistByUserId(userId);
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el artista." });
    }
}

async function createArtist(req, res) {
    try {
        const userId = req.userId;
        const { name } = req.body;

        const newArtist = await artistController.createArtist(userId, name);
        res.status(201).json(newArtist);
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


async function updateArtist(req, res) {
    try {
        const artistId = req.artistId;
        const { name } = req.body;
        const updateArtist = await artistController.updateArtist(artistId, name);
        res.status(200).json(updateArtist);
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

async function updateArtistStatus(req, res) {
    try {
        const { active } = req.body;
        const updateArtist = await artistController.updateArtistStatus(req.artistId, active);
        res.status(200).json(updateArtist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the artist status." });
    }
}


export const functions = { getAllArtists, getArtistByUserId, createArtist, updateArtist, updateArtistStatus, getArtistById };

export default functions;