import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js"; // Importar modelo User
import Song from "./songModel.js"; // Importar modelo Song

// Definición del modelo Purchase
const Purchase = sequelize.define("purchase", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    song_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
            const rawValue = this.getDataValue("purchase_date");
            if (!rawValue) return null;

            // Formatea la fecha en "YYYY-MM-DDTHH:MM"
            const fecha = new Date(rawValue);
            return fecha.toISOString().slice(0, 16);
        },
    },
});

// Relación con User
Purchase.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relación con Song
Purchase.belongsTo(Song, {
    foreignKey: "song_id",
    as: "song",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relaciones inversas
User.hasMany(Purchase, {
    foreignKey: "user_id",
    as: "purchases",
});

Song.hasMany(Purchase, {
    foreignKey: "song_id",
    as: "purchases",
});

export default Purchase;
