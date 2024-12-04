import { verifyPassword } from "../../config/bcrypt.js";
import userController from "../user/userController.js";
import error from "../../hellpers/errors.js";

async function register(username, email, password, passwordConfirm) {
        const existingEmail = await userController.getUserByEmail(email);
        const existingUsername = await userController.getUserByUsername(username);

        if (existingEmail) {
            throw new error.EMAIL_ALREADY_EXISTS();
        }

        if (existingUsername) {
            throw new error.USERNAME_ALREADY_EXISTS();
        }

        if (password !== passwordConfirm) {
            throw new error.PASSWORD_NOT_MATCH();
        }

        const newUser = await userController.createUser(username, email, password);
        return newUser;
}

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
