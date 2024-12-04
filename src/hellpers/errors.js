class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

// -----------------------LOGIN AND REGISTER---------------------------------
class USER_NOT_FOUND extends AppError {
    constructor() {
        super("Usuario no encontrado", 404);
    }
}

class PASSWORD_NOT_MATCH extends AppError {
    constructor() {
        super("Contraseñas no coinciden", 400);
    }
}

class USER_ALREADY_EXISTS extends AppError {
    constructor() {
        super("El usuario ya existe", 409);
    }
}

class EMAIL_ALREADY_EXISTS extends AppError {
    constructor() {
        super("El email ya está en uso", 409);
    }
}

class USERNAME_ALREADY_EXISTS extends AppError {
    constructor() {
        super("El nombre de usuario ya está en uso", 409);
    }
}

class INVALID_CREDENTIALS extends AppError {
    constructor() {
        super("Credenciales inválidas", 401);
    }
}

class USER_NOT_ACTIVE extends AppError {
    constructor() {
        super("El usuario no está activo", 403);
    }
}

// -----------------------------SONGS-------------------------------------
class SONG_NOT_FOUND extends AppError {
    constructor() {
        super("Canción no encontrada", 404);
    }
}

class SONG_CREATION_FAILED extends AppError {
    constructor() {
        super("No se pudo crear la canción", 500);
    }
}

class SONG_UPDATE_FAILED extends AppError {
    constructor() {
        super("No se pudo actualizar la canción", 500);
    }
}

class SONG_DELETION_FAILED extends AppError {
    constructor() {
        super("No se pudo eliminar la canción", 500);
    }
}

class FILE_NOT_FOUND extends AppError {
    constructor() {
        super("Archivo no encontrado", 404);
    }
}

class FILE_PROCESSING_ERROR extends AppError {
    constructor() {
        super("Error al procesar el archivo", 500);
    }
}

class ARTIST_PERMISSIONS_ERROR extends AppError {
    constructor() {
        super("Nesitas ser artista para subir una cación", 404);
    }
}

// -----------------------------PURCHASES-------------------------------------
class PURCHASE_ALREADY_EXISTS extends AppError {
    constructor() {
        super("La compra ya existe", 409); // 409 Conflict
    }
}

class PURCHASE_CREATION_FAILED extends AppError {
    constructor() {
        super("No hay ninguna compra", 500); // 500 Internal Server Error
    }
}

// -----------------------------ARTISTS-------------------------------------

class ARTISTS_NOT_FOUND extends AppError {
    constructor() {
        super("No se encontraron artistas", 404);
    }
}

class ARTIST_NAME_ALREADY_EXISTS_ERROR extends AppError {
    constructor() {
        super("Ya existe un artista con ese nombre", 500);
    }
}

class ARTIST_USER_ID_ALREADY_EXISTS_ERROR extends AppError {
    constructor() {
        super("No puedes crear mas de un artista", 404);
    }
}

class ARTIST_NOT_ACTIVE_ERROR extends AppError {
    constructor() {
        super("El artista no está activo", 403);
    }
}

// -----------------------------USERS-------------------------------------

class NO_USERS_FOUND extends AppError {
    constructor() {
        super("No hay usuarios", 403);
    }
}

class NO_USERS_SONG extends AppError {
    constructor() {
        super("La canción no pertenece al usuario", 403);
    }
}

export const errors = {
    USER_NOT_FOUND,
    PASSWORD_NOT_MATCH,
    USER_ALREADY_EXISTS,
    EMAIL_ALREADY_EXISTS,
    USER_NOT_ACTIVE,
    USERNAME_ALREADY_EXISTS,
    INVALID_CREDENTIALS,
    SONG_NOT_FOUND,
    SONG_CREATION_FAILED,
    SONG_UPDATE_FAILED,
    SONG_DELETION_FAILED,
    FILE_NOT_FOUND,
    FILE_PROCESSING_ERROR,
    ARTIST_PERMISSIONS_ERROR,
    PURCHASE_ALREADY_EXISTS,
    PURCHASE_CREATION_FAILED,
    ARTISTS_NOT_FOUND,
    ARTIST_NAME_ALREADY_EXISTS_ERROR,
    ARTIST_USER_ID_ALREADY_EXISTS_ERROR,
    ARTIST_NOT_ACTIVE_ERROR,
    NO_USERS_FOUND,
    USER_NOT_FOUND,
    NO_USERS_SONG,
 
};

export default errors;
