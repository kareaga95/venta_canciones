import authController from "../auth/authController.js";
import jwt from "../../config/jwt.js";

console.log("Auth API Controller");
async function register(req, res) {
    console.log("LLEGA REGISTER");
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
    console.log("LLEGA LOGIN");
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        const token = jwt.sign({id:user.dataValues.id, rol:user.dataValues.rol});
        console.log("TOKEN LOGIN", token);
        res.json({token});
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
}

export default {
    register,
    login,
};
