import userModel from "../../model/userModel.js";
import artistModel from "../../model/artistModel.js";
import songModel from "../../model/songModel.js";
import error from "../../hellpers/errors.js";
import { hashPassword } from "../../config/bcrypt.js";

async function getAllUsers() {
    const users = await userModel.findAll();
    return users;
}
async function getUserById(id) {
    const user = await userModel.findByPk(id);
    return user;
}
async function getUserByEmail(email) {
    const user = await userModel.findOne({ where: { email } });
    return user;
}

async function getUserByUsername(username) {
    const user = await userModel.findOne({ where: { username } });
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

async function updateUser(id, username, email, password, rol) {
    const user = await userModel.findByPk(id);

    if (rol === "admin") {
        const existingAdmin = await userModel.findOne({ where: { rol: "admin" } });
        if (existingAdmin && existingAdmin.id !== id) {
            throw new Error("Solo puede haber un usuario con rol 'admin'");
        }
    }

    user.username = username;
    user.email = email;
    user.rol = rol;
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

export const functions = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    desactivateUser,
    activateUser
};
export default functions;
