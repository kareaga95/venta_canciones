import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js"

// Definición del modelo Artist
const Artist = sequelize.define("artist", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
        },
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
});

User.hasOne(Artist, {
    foreignKey: "user_id",
    as: "artist",
});

Artist.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

export default Artist;
