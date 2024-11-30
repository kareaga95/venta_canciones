import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function sign(data, expiresIn = "1h") {
    const token = jwt.sign(data, SECRET, { expiresIn });
    return token;
}

function verify(token) {
    try {
        const response = jwt.verify(token,secret);
        return response;
    } catch (error) {
        console.error(error);
        return { error: "Can't verify token", status: 500 };
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

function generateVerificationToken(userId){
    const payload = { id: userId };
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h", // El token expira en 1 día
    });
    return token;
};

export default {
    sign,
    verify,
    generateVerificationToken
};
