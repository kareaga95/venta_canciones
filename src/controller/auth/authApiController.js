import authController from "../auth/authController.js";
import jwt from "../../config/jwt.js";

async function register(req, res) {
    try {
        console.log("REGISTRO")
        const { username, email, password, confirmPassword } = req.body;
        const result = await authController.register(username, email, password, confirmPassword);
        return res.status(201).json({ message: "User registered successfully", user: result }); // 201 Created
    } catch (error) {
        console.error("REGISTER API ERROR: ", error);

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        const token = jwt.sign({ id: user.dataValues.id, rol: user.dataValues.rol });
       
        return res.status(200).json({ message: "Login successful", token }); // 200 OK
    } catch (error) {
        console.error("LOGIN API ERROR: ", error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}

export default {
    register,
    login,
};
