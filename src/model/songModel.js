import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Artist from "./artistModel.js"; // Importar modelo Artist

// Definición del modelo Song
const Song = sequelize.define(
    "song",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        artist_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        audio_file_path: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        cover_image: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue("release_date");
                if (!rawValue) return null;

                // Formatea la fecha en "YYYY-MM-DDTHH:MM"
                const fecha = new Date(rawValue);
                return fecha.toISOString().slice(0, 16);
            },
        },
        file_size: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        file_type: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        sales_amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
        created_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue("created_date");
                if (!rawValue) return null;

                // Formatea la fecha en "YYYY-MM-DDTHH:MM"
                const fecha = new Date(rawValue);
                return fecha.toISOString().slice(0, 16);
            },
        },
        updated_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue("updated_date");
                if (!rawValue) return null;

                // Formatea la fecha en "YYYY-MM-DDTHH:MM"
                const fecha = new Date(rawValue);
                return fecha.toISOString().slice(0, 16);
            },
        },
    },
    {
        freezeTableName: true, // Evita pluralización automática
        timestamps: false, // No añade automáticamente `createdAt` y `updatedAt`
    }
);

// Relación con Artist
Song.belongsTo(Artist, {
    foreignKey: "artist_id",
    as: "artist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relación inversa
Artist.hasMany(Song, {
    foreignKey: "artist_id",
    as: "songs",
});

export default Song;
