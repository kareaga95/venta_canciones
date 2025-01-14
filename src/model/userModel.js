import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

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

        get() {
            const rawValue = this.getDataValue("created_date");
            if (!rawValue) return null;

            const date = new Date(rawValue);
            date.setHours(date.getHours() + 1);
            return date.toISOString().slice(0, 16);
        },
    },
    updated_date: {
        type: DataTypes.DATE,
        allowNull: true,

        get() {
            const rawValue = this.getDataValue("updated_date");
            if (!rawValue) return null;

            const date = new Date(rawValue);
            date.setHours(date.getHours() + 1);
            return date.toISOString().slice(0, 16);
        }
    }
});

export default User;
