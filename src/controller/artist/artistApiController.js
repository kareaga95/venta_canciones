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
        handleError(res, error);
    }
}

async function getArtistByUserId(req, res) {
    const userId = req.userId;
    try {
        console.log("LLEGA ARTISTA " + artist);
        const artist = await artistController.getArtistByUserId(userId);
        console.log("LLEGA ARTISTA1 " + artist);
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el artista." });
    }
}

async function createArtist(req, res) {
    try {
        const userId = req.userId;
        const { name } = req.body;
        console.log("NAME " + name);
        const existingArtist = await artistController.getArtistByUserId(userId);
        if (existingArtist) {
            if (existingArtist.name === name || existingArtist.user_id === userId) {
                res.status(500).json({ error: "El artista ya existe." });
            }
        }

        if (!userId || !name) {
            return res.status(400).json({ error: "userId y name son obligatorios" });
        }

        const newArtist = await artistController.createArtist(userId, name);
        res.status(201).json(newArtist);
    } catch (error) {
        console.error("Error en createArtist:", error);

        res.status(500).json({ error: "Error interno al crear el artista" });
    }
}


async function updateArtist(req, res) {
    try {
        const artistId = req.artistId;
        const userId = req.userId;
        const { name } = req.body;
        const updatedUser = await userController.updateUser(artistId, name, userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        handleError(res, error);
    }
}

async function desactivateArtist(req, res) {
    try {
        const desactivateArtist = await artistController.desactivateArtist(req.artistId);
        res.status(200).json(desactivateArtist);
    } catch (error) {
        handleError(res, error);
    }
}

async function activateArtist(req, res) {
    try {
        const activateArtist = await artistController.activateArtist(req.artistId);
        res.status(200).json(activateArtist);

    } catch (error) {
        handleError(res, error);
    }
}

export const functions = { getAllArtists, getArtistByUserId, createArtist, updateArtist, desactivateArtist, activateArtist };

export default functions;