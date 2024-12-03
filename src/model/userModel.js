import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Definición del modelo User
const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    
    rol: {
        type: DataTypes.ENUM("client", "admin"),
        allowNull: true,
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    // emailToken: {
    //     type: DataTypes.STRING, // Token para confirmar el correo
    //     allowNull: true,
    // },
    created_date: {
        type: DataTypes.DATE,
        allowNull: true,
        // Formatea la fecha para el input de tipo datetime-local
        get() {
            const rawValue = this.getDataValue("create_time");
            if (!rawValue) return null;

            // Formatea la fecha en "YYYY-MM-DDTHH:MM"
            const fecha = new Date(rawValue);
            return fecha.toISOString().slice(0, 16);
        },
    },
    updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
        // Formatea la fecha para el input de tipo datetime-local
        get() {
            const rawValue = this.getDataValue("create_time");
            if (!rawValue) return null;

            // Formatea la fecha en "YYYY-MM-DDTHH:MM"
            const fecha = new Date(rawValue);
            return fecha.toISOString().slice(0, 16);
        },
    }
});

export default User;
