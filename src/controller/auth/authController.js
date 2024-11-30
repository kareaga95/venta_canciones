import { verifyPassword } from "../../config/bcrypt.js";
import userController from "../user/userController.js";
import error from "../../hellpers/errors.js";

async function register(username, email, password, passwordConfirm){
    try {
        const existingEmail = await userController.getUserByEmail(email);
        const existingUsername = await userController.getUserByUsername(username);

        if(existingEmail){
            console.log("ERROR 1: " + error.EMAIL_ALREADY_EXISTS)
            throw new error.EMAIL_ALREADY_EXISTS();
        }

        if(existingUsername){
            console.log("ERROR 2: " + error.USERNAME_ALREADY_EXISTS)
            throw new error.USERNAME_ALREADY_EXISTS();
        }

        if(password!== passwordConfirm){
            console.log("ERROR 3: " + error.PASSWORD_NOT_MATCH)
            throw new error.PASSWORD_NOT_MATCH();
        }

        const newUser = await userController.createUser(username, email, password);
        return newUser;

    } catch (error) {
        
    }
}

async function login(email, password) {
    try {
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
    } catch (err) {
        console.error("AUTH CONTROLLER ERROR: ", err);
        throw err;
    }
}


export const functions = {
    register,
    login,
};

export default functions;