# 💸 PocketLog

PocketLog es una aplicación web de gestión financiera personal que permite a los usuarios llevar un control preciso de sus ingresos y gastos. La plataforma proporciona herramientas intuitivas para registrar transacciones, organizar las finanzas por categorías y generar reportes visuales, ayudando a los usuarios a administrar su dinero de manera eficiente y planificar mejor su futuro financiero.

## 📋 Tabla de Contenidos

1. [Características](#-características)
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [Instalación](#-instalación)
4. [Uso](#-uso)
5. [Endpoints](#-endpoints)
6. [Colaboradores](#-colaboradores)

## 🌟 Características

-   Registro y autenticación de usuarios.
-   Añadir, editar y eliminar canciones, usuarios, artistas.
-   Compra y venta de canciones.

## 🛠️ Tecnologías Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF5733?style=for-the-badge&logo=node.js&logoColor=white)



## ⚙️ Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/kareaga95/venta_canciones

    ```

2. **Crear archivo '.env'**

    Utilizando el '.env.example' crea el archivo '.env' y añade las variables de entorno

    ```plaintext
        DB_HOST=db
        DB_PORT=3308
        APP_HOST=Venta_Canciones
        APP_PORT=3001
        DB_USER=usuario
        DB_PASSWORD=12345
        DB_NAME=venta_canciones
        SECRET=clave_secreta
        DB_DIALECT=mysql
        JWT_SECRET=secretoJWTMikel
        SESSION_SECRET=secretSessionMikel
    ```

3. **Inicia el contenedor de docker**:

    Entra en la carpeta del proyecto y usa este comando para crear el contenedor

    ```bash
    docker compose up --build
    ```

4. **Disfruta de la app :)**

## 🚀 Uso

1. **Inicio de Sesión o Registro**:
    - Ingresa con tu usuario y contraseña si ya tienes una cuenta.
    - Si no tienes cuenta, regístrate rápidamente con tus datos personales.

2. **Compra de Canciones**:
    - Accede a la ventana las canciones donde puedes:
        - Ver todas todas las canciones disponibles de la tienda.
        - Filtrar titulo, genero, artista, precio.
    - Añade una nueva compra pulsando en boton "Comprar" de cada canción:

3. **Venta de Canciónes:**
    - Pulsando en el boton de "Soy artista" rellenaremos el formulario para poder acceder a nuestra cuenta como artista.
    - Una vez creada la cuenta como artista, podremos subir nuestras canciones rellenando el formulario con los siguientes campos:
        -Titulo
        -Genero
        -Precio
        -Fecha de estreno
4. Ventana de Administración (Solo Administradores):
    - Accede a una vista exclusiva para administradores donde podrás:
        - Visualizar todos los usuarios (y artistas) registrados en la base de datos.
        - Gestionar la desactivacion y activacion de las cuentas de los usuarios.

## 📌 Endpoints

/auth/login

/auth/register

/songs/

/songs/artist

/songs/:id/download

/songs/new

/songs/:id/update

/songs/:id/delete

/songs/:id


/users/

/users/new

/users/:id/update

/users/status

/users/:id

/users/email/:email


/purchases/new

/purchases/user


/artists/

/artists/:id

/artists/new

/artists/update

/artists/status




