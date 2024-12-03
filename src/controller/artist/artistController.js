import artistModel from "../../model/artistModel.js";
import error from "../../hellpers/errors.js";

async function getAllArtists() {
    const artists = await artistModel.findAll();
    return artists;
}

async function getArtistByUserId(userId) {
    return artistModel.findOne({ where: { user_id: userId } });
}

async function createArtist(userId, name) {
    console.log("ARTIST CREATE2:  " + name, userId);
    return artistModel.create({user_id: userId, name});
}

async function updateArtist(id, name, userId) {
    const artist = await artistModel.findByPk(id);
    artist.name = name;
    artist.user_id = userId;
    await artist.save();
    return artist;
}

async function desactivateArtist(id) {
    const artist = await artistModel.findByPk(id);
    artist.active = 0;
    await artist.save();
    return artist;
}

async function activateArtist(id) {
    const artist = await artistModel.findByPk(id);
    artist.active = 1;
    await artist.save();
    return artist;
}

export const functions = { getAllArtists,getArtistByUserId, createArtist, updateArtist, desactivateArtist, activateArtist};

export default functions;