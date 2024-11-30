import authController from "../auth/authController.js";
import jwt from "../../config/jwt.js";

async function register(req, res) {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const result = await authController.register(username,email,password, confirmPassword);
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        const token = jwt.sign({id:user.dataValues.id, rol:user.dataValues.rol});
        res.json({token});
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
}

export default {
    register,
    login,
};
