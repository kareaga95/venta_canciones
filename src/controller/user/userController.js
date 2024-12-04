import userModel from "../../model/userModel.js";
import artistModel from "../../model/artistModel.js";
import songModel from "../../model/songModel.js";
import error from "../../hellpers/errors.js";
import { hashPassword } from "../../config/bcrypt.js";
import artistController from "../../controller/artist/artistController.js"
import songController from "../../controller/song/songController.js";

async function getAllUsers() {
    const users = await userModel.findAll();
    if (!users) {
        throw new error.NO_USERS_FOUND();
    }
    return users;
}
async function getUserById(id) {
    const user = await userModel.findByPk(id);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}
async function getUserByEmail(email) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

async function getUserByUsername(username) {
    const user = await userModel.findOne({ where: { username } });
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

async function createUser(username, email, password) {
    const hash = await hashPassword(password);
    const newUser = await userModel.create({
        username,
        email,
        password: hash,
    });

    return newUser;
}

async function updateUser(id, username, email, password) {
    const user = await userModel.findByPk(id);
    const existingUserName = await userModel.findByName(username);
    if (existingUserName) {
        throw new error.USERNAME_ALREADY_EXISTS();
    }
    const existingemail = await userModel.findByEmail(email);
    if (existingemail) {
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    user.username = username;
    user.email = email;
    if (password) {
        user.password = await hashPassword(password);
    }

    await user.save();
    return user;
}

async function desactivateUser(id) {
    const userToRemove = await userModel.findByPk(id);
    const isArtist = await artistModel.findAll({ where: { user_id: id } });
    const artistIds = isArtist.map(artist => artist.id);
    if (isArtist) {
        await songModel.update({ visible: 0 }, { where: { artist_id: artistIds } });
    }
    userToRemove.active = 0;
    userToRemove.save();
    return userToRemove;

}

async function activateUser(id) {
    const userToRemove = await userModel.findByPk(id);
    const isArtist = await artistModel.findAll({ where: { user_id: id } });
    const artistIds = isArtist.map(artist => artist.id);
    if (isArtist) {
        await songModel.update({ visible: 1 }, { where: { artist_id: artistIds } });
    }
    userToRemove.active = 1;
    userToRemove.save();
    return userToRemove;
}

async function updateUserStatus(id, active) {
    const user = await userModel.findByPk(id);
    const isArtist = await artistController.getArtistByUserId(id);
    const artistsSongs = await songController.getSongsByArtistId(isArtist.id);
    console.log("TU RAZA: " + id);
    if (artistsSongs) {
        for (const song of artistsSongs) {
            song.visible = active;
            await song.save();
        }
    }

    if (isArtist) {
        isArtist.active = active;
        await isArtist.save();
    }

    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    user.active = active;
    user.updated_date = new Date();
    await user.save();
    return user;
}

export const functions = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    desactivateUser,
    activateUser,
    updateUserStatus

};
export default functions;
