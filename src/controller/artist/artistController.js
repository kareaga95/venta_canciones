import artistModel from "../../model/artistModel.js";
import error from "../../hellpers/errors.js";
import songController from "../../controller/song/songController.js";
import songModel from "../../model/songModel.js"; 

async function getAllArtists() {
    const artists = await artistModel.findAll();
    if(!artists){
        throw new error.ARTISTS_NOT_FOUND();
    }
    return artists;
}

async function getArtistByUserId(userId) {
    return artistModel.findOne({ where: { user_id: userId } });
}

async function createArtist(userId, name) {
    const existingArtistName = await artistModel.findOne({where: {name: name}});
    const existingUserId = await artistModel.findOne({where: {user_id: userId}});
    if(existingUserId){
        throw new error.ARTIST_USER_ID_ALREADY_EXISTS_ERROR;
    }
    if(existingArtistName){
        throw new error.ARTIST_NAME_ALREADY_EXISTS_ERROR;
    }
    return artistModel.create({user_id: userId, name});
}

async function updateArtist(id, name) {
    const artist = await artistModel.findByPk(id);
    const existingArtistName = await artistModel.findOne({where: {name: name}});

    if(existingArtistName) {
        throw new error.ARTIST_NAME_ALREADY_EXISTS_ERROR;
    }

    songApiController.
    artist.name = name;
    await artist.save();
    return artist;
}

async function updateArtistStatus(id, active) {
    const artist = await artistModel.findByPk(id);
    const artistsSongs = await songController.getSongsByArtistId(id);
    if(artistsSongs){
            for (const song of artistsSongs) {
                song.visible = active;
                await song.save();
            }
    }
    
    artist.active = active;
    artist.updated_date = new Date();
    await artist.save();
    return artist;
}

export const functions = { getAllArtists,getArtistByUserId, createArtist, updateArtist, updateArtistStatus};

export default functions;