import jwt from "../config/jwt.js";
import artistController from "../controller/artist/artistController.js";
import songController from "../controller/song/songController.js";
async function isAuthenticated(req, res, next) {
    console.log("ESTÁ ENTRANDO");
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ error: "JWT token needed" });
        }

        const token = authorization.replace("Bearer ", "");
        const verified = jwt.verify(token);

        if (verified.error) {
            return res.status(401).json({ error: "JWT token is not correct" });
        }

        req.userId = verified.id;
        req.rol = verified.rol;

        const artist = await artistController.getArtistByUserId(req.userId);
        if (artist) {
            req.artistId = artist.id;
        }

        next();
    } catch (err) {
        console.error("Error in isAuthenticated middleware:", err);
        res.status(401).json({ error: "Authentication failed" });
    }
}

async function songBelongsToUser(req, res, next) {
    try {
        const songId = req.params.id;
        const userId = req.userId;

        const artist = await artistController.getArtistByUserId(userId);
        if (!artist) {
            return res.status(403).json({ error: "You need to be an artist to perform this action" });
        }

        const song = await songController.getSongById(songId);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        if (song.artist_id !== artist.id) {
            return res.status(403).json({ error: "You don't have permissions to access this song" });
        }

        req.artistId = artist.id;
        next();
    } catch (err) {
        console.error("Error in songBelongsToUser middleware:", err);
        res.status(err.status || 500).json({ error: err.message || "Internal server error" });
    }
}

async function isAdmin(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "jwt token needed" });
    }
    const token = authorization.replace("Bearer ", "");
    const verified = jwt.verify(token);
    if (verified.error) {
        return res.status(401).json({ error: "jwt token not correct" });
    }
    if (!verified.rol || verified.rol !== "admin") {
        return res.status(403).json({ error: "not allowed" });
    }
    next();
}

async function isAdminOrSelfUser(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "jwt token needed" });
    }
    const token = authorization.replace("Bearer ", "");
    const verified = jwt.verify(token);
    if (verified.error) {
        return res.status(401).json({ error: "jwt token not correct" });
    }
    const id = parseInt(req.params.id);
    if ((!verified.role || verified.role !== "admin") && id != verified.user_id) {
        return res.status(403).json({ error: "not allowed" });
    }

    next();
}

export { isAuthenticated, isAdmin, isAdminOrSelfUser, songBelongsToUser };
