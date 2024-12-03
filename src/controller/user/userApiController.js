import User from "../../model/userModel.js";
import userController from "./userController.js";

// Maneja los errores y responde con un estado 500 y el mensaje de error
function handleError(res, error) {
    res.status(500).json({ error: error.message });
}

// Obtiene todos los usuarios
async function getAllUsers(req, res) {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
}

async function getUserByEmail(req, res) {
    try {
        const users = await userController.getUserByEmail(req.params.email);
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
}

async function getUserByUsername(req, res) {
    try {
        const users = await userController.getUserByUsername(req.params.username);
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
}

async function getUserById(req, res) {
    try {
        const users = await userController.getUserById(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
}

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const newUser = await userController.createUser(username, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        handleError(res, error);
    }
}

async function updateUser(req, res) {
    try {  
        const { username, email, password, rol } = req.body;
        const updatedUser = await userController.updateUser(req.params.id, username, email, password, rol);
        res.status(200).json(updatedUser);
    } catch (error) {
        handleError(res, error);
    }
}

async function desactivateUser(req, res) {
    try {
        const desactivateUser = await userController.desactivateUser(req.params.id);
        res.status(200).json(desactivateUser);
    } catch (error) {
        handleError(res, error);
    }
}

async function activateUser(req, res) {
    try {
        const activatedUser = await userController.activateUser(req.params.id);
        res.status(200).json(activatedUser);
    } catch (error) {
        handleError(res, error);
    }
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