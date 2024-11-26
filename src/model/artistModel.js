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

User.hasOne(Artist, {
    foreignKey: "user_id",
    as: "artist",
});

Artist.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

export default Artist;
