import userModel from "../../model/userModel.js";
import artistModel from "../../model/artistModel.js";
import songModel from "../../model/songModel.js";
import error from "../../hellpers/errors.js";
import { hashPassword } from "../../config/bcrypt.js";
import artistController from "../../controller/artist/artistController.js"
import songController from "../../controller/song/songController.js";

/**
 * Obtiene todos los usuarios registrados.
 *
 * @async
 * @function getAllUsers
 * @throws {NO_USERS_FOUND} Si no se encuentran usuarios en la base de datos.
 * @returns {Promise<Array>} Retorna una lista de usuarios.
 *
 * @example
 * try {
 *   const users = await getAllUsers();
 *   console.log("Usuarios:", users);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
async function getAllUsers() {
    const users = await userModel.findAll();
    if (!users) {
        throw new error.NO_USERS_FOUND();
    }
    return users;
}

/**
 * Obtiene un usuario por su identificador único.
 *
 * @async
 * @function getUserById
 * @param {string|number} id - El ID del usuario.
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el objeto del usuario encontrado.
 *
 * @example
 * const user = await getUserById(1);
 * console.log("Usuario encontrado:", user);
 */
async function getUserById(id) {
    const user = await userModel.findByPk(id);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

/**
 * Obtiene un usuario por su correo electrónico.
 *
 * @async
 * @function getUserByEmail
 * @param {string} email - Correo electrónico del usuario.
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el usuario encontrado.
 *
 * @example
 * const user = await getUserByEmail("test@example.com");
 * console.log("Usuario encontrado:", user);
 */
async function getUserByEmail(email) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

/**
 * Obtiene un usuario por su nombre de usuario.
 *
 * @async
 * @function getUserByUsername
 * @param {string} username - Nombre de usuario.
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el usuario encontrado.
 *
 * @example
 * const user = await getUserByUsername("john_doe");
 * console.log("Usuario encontrado:", user);
 */
async function getUserByUsername(username) {
    const user = await userModel.findOne({ where: { username } });
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @async
 * @function createUser
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} Retorna el usuario recién creado.
 *
 * @example
 * const newUser = await createUser("john_doe", "test@example.com", "password123");
 * console.log("Nuevo usuario creado:", newUser);
 */
async function createUser(username, email, password) {
    const hash = await hashPassword(password);
    const newUser = await userModel.create({
        username,
        email,
        password: hash,
    });

    return newUser;
}

/**
 * Actualiza la información de un usuario específico.
 *
 * @async
 * @function updateUser
 * @param {string|number} id - Identificador único del usuario.
 * @param {string} username - Nuevo nombre de usuario.
 * @param {string} email - Nuevo correo electrónico del usuario.
 * @param {string} [password] - Nueva contraseña del usuario.
 * @throws {USERNAME_ALREADY_EXISTS} Si el nuevo nombre de usuario ya existe.
 * @throws {EMAIL_ALREADY_EXISTS} Si el nuevo correo electrónico ya existe.
 * @returns {Promise<Object>} Retorna el usuario actualizado.
 *
 * @example
 * const updatedUser = await updateUser(1, "john_doe_updated", "new@example.com", "newpass123");
 * console.log("Usuario actualizado:", updatedUser);
 */
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

/**
 * Actualiza el estado de un usuario (activo/inactivo) y ajusta la visibilidad de sus canciones si es artista.
 *
 * @async
 * @function updateUserStatus
 * @param {string|number} id - Identificador único del usuario.
 * @param {boolean} active - Nuevo estado del usuario (true para activo, false para inactivo).
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el usuario con su estado actualizado.
 *
 * @example
 * const updatedUser = await updateUserStatus(1, false);
 * console.log("Estado del usuario actualizado:", updatedUser);
 */
async function updateUserStatus(id, active) {
    const user = await userModel.findByPk(id);
    const isArtist = await artistController.getArtistByUserId(id);
    const artistsSongs = await songController.getSongsByArtistId(isArtist.id);
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
    updateUserStatus

};
export default functions;
