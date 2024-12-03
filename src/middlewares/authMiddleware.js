import jwt from "../config/jwt.js";
import artistController from "../controller/artist/artistController.js";
import songController from "../controller/song/songController.js";
async function isAuthenticated(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    const isArtist = await artistController.getArtistByUserId(verified.id);
    if(isArtist){
        req.artistId = isArtist.id;
        console.log("Es artista", req.artistId);
    }
    req.userId = verified.id;
    req.rol = verified.rol;
    
    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    next();
}

async function songBelongsToUser(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    req.userId = verified.id;
    const artistId = await artistController.getArtistByUserId(verified.id).then((artist) => artist.id);
    const songId = await songController.getSongById(req.params.id);
    if(songId.artist_id != artistId){
        return res.status(403).json({error:"No tienes permisos para esta operacion"});
    }

    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    next();
}

async function isAdmin(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    if(!verified.rol || verified.rol !== "admin"){
        return res.status(403).json({error:"not allowed"});
    }
    next();
}

async function isAdminOrSelfUser(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"jwt token needed"});
    }
    const token = authorization.replace("Bearer ","");
    const verified = jwt.verify(token);
    if(verified.error){
        return res.status(401).json({error:"jwt token not correct"});
    }
    const id = parseInt(req.params.id);
    if((!verified.role || verified.role !== "admin")&& id!=verified.user_id){
        return res.status(403).json({error:"not allowed"});
    }

    next();
}

// async function isArtist(req, res, next) {
//     const authorization = req.headers.authorization;
//     if (!authorization) {
//         return res.status(401).json({ error: "jwt token needed" });
//     }

//     const token = authorization.replace("Bearer ", "");
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de usar el secreto correcto
        
//         // Verificar si el usuario es un artista
//         const isArtist = await artistController.getArtistByUserId(verified.id) !== null;

//         if (!isArtist) {
//             return res.status(403).json({ error: "not allowed" });
//         }

//         next(); // Llamar al siguiente middleware o controlador
//     } catch (error) {
//         console.error("JWT verification error:", error);
//         return res.status(401).json({ error: "jwt token not correct" });
//     }
// }
export { isAuthenticated, isAdmin, isAdminOrSelfUser, songBelongsToUser };
