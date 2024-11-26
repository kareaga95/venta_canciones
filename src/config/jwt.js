import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = dotenv.env.JWT_SECRET;
function sign(data, expiresIn = "1h") {
    const token = jwt.sign(data, secret, {
        expiresIn,
    });
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

export default {
    sign,
    verify,
};
