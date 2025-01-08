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
    created_date: {
        type: DataTypes.DATE,
        allowNull: true,
        // Formatea la fecha para el input de tipo datetime-local
        get() {
            const rawValue = this.getDataValue("created_date");
            if (!rawValue) return null;

            const date = new Date(rawValue);
            date.setHours(date.getHours() + 1); // Ajusta la hora a CST (UTC-5)
            return date.toISOString().slice(0, 16);
        },
    },
    updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
        // Formatea la fecha para el input de tipo datetime-local
        get() {
            const rawValue = this.getDataValue("updated_date");
            if (!rawValue) return null;

            const date = new Date(rawValue);
            date.setHours(date.getHours() + 1); // Ajusta la hora a CST (UTC-5)
            return date.toISOString().slice(0, 16);
        },
        account_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: false,
        },
        bank_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
    }
});

export default User;
