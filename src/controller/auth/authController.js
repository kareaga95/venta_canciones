import { verifyPassword } from "../../config/bcrypt.js";
import userController from "../user/userController.js";
import error from "../../hellpers/errors.js";
import User from "../../model/userModel.js";

/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @async
 * @function register
 * @param {string} username - El nombre de usuario.
 * @param {string} email - La dirección de correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @param {string} confirmPassword - Confirmación de la contraseña.
 * @throws {EMAIL_ALREADY_EXISTS} Si el correo electrónico ya está registrado.
 * @throws {USERNAME_ALREADY_EXISTS} Si el nombre de usuario ya existe.
 * @throws {PASSWORD_NOT_MATCH} Si las contraseñas no coinciden.
 * @returns {Promise<Object>} Devuelve el objeto del usuario recién creado.
 *
 * @example
 * try {
 *   const newUser = await register("john_doe", "john@example.com", "password123", "password123");
 *   console.log("Usuario registrado:", newUser);
 * } catch (error) {
 *   console.error("Error al registrar usuario:", error.message);
 * }
 */
async function register(username, email, password, confirmPassword) {
        const existingEmail = await User.findOne({where: {email: email}});
        const existingUsername = await User.findOne({where: {username: username}});

        if (existingEmail) {
            throw new error.EMAIL_ALREADY_EXISTS();
        }

        if (existingUsername) {
            throw new error.USERNAME_ALREADY_EXISTS();
        }

        if (password !== confirmPassword) {
            throw new error.PASSWORD_NOT_MATCH();
        }

        const newUser = await userController.createUser(username, email, password);
        return newUser;
}

/**
 * Inicia sesión para un usuario existente.
 *
 * @async
 * @function login
 * @param {string} email - La dirección de correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @throws {USER_NOT_FOUND} Si no se encuentra un usuario con el correo proporcionado.
 * @throws {INVALID_CREDENTIALS} Si la contraseña es incorrecta.
 * @throws {USER_NOT_ACTIVE} Si el usuario no está activo.
 * @returns {Promise<Object>} Devuelve el objeto del usuario autenticado.
 *
 * @example
 * try {
 *   const user = await login("john@example.com", "password123");
 *   console.log("Usuario autenticado:", user);
 * } catch (error) {
 *   console.error("Error al iniciar sesión:", error.message);
 * }
 */
async function login(email, password) {
        const user = await userController.getUserByEmail(email);
        if (!user) {
            throw new error.USER_NOT_FOUND();
        }

        const verified = await verifyPassword(password, user.password);
        if (!verified) {
            throw new error.INVALID_CREDENTIALS();
        }

        if (user.active === 0) {
            throw new error.USER_NOT_ACTIVE();
        }

        return user;
}

export const functions = {
    register,
    login,
};

export default functions;
