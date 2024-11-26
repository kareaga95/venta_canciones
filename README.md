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
-   Añadir, editar y eliminar ingresos y gastos.
-   Visualización de gráficos financieros.
-   Resúmenes de ingresos y gastos por periodos de tiempo.

## 🛠️ Tecnologías Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## ⚙️ Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/YerBrown/proyecto-finanzas-personales

    ```

2. **Crear archivo '.env'**

    Utilizando el '.env.example' crea el archivo '.env' y añade las variables de entorno

    ```plaintext
     DB_HOST=proyecto-finanzas-db
     DB_PORT=3308
     APP_HOST=proyecto-finanzas
     APP_PORT=3001
     DB_USER=usuario
     DB_PASSWORD=12345
     DB_NAME=Proyecto_Finanzas
     SESSION_SECRET=yermikjorant
     DB_DIALECT=mysql
    ```

3. **Inicia el contenedor de docker**:

    Entra en la carpeta del proyecto y usa este comando para crear el contenedor

    ```bash
    docker compose up --build
    ```

4. **Disfruta de nuestra app :)**

## 🚀 Uso

1. **Inicio de Sesión o Registro**:

    - Ingresa con tu usuario y contraseña si ya tienes una cuenta.
    - Si no tienes cuenta, regístrate rápidamente con tus datos personales.

2. **Gestión de Transacciones**:
    - Accede a la ventana de gastos e ingresos, donde puedes:
        - Ver todas tus transacciones, editarlas o borrarlas.
        - Filtrar por mes o año para un análisis más detallado.
        - Consultar tu balance de ahorro actual.
    - Añade una nueva transacción pulsando en los botones superiores del navegadir y completa un formulario con:
        - Cantidad.
        - Fecha de la transacción.
        - Categoría.
        - Título personalizado.
        - Comentario (opcional).
3. **Análisis por Categoría:**
    - Pulsando en los botones centrales de gastos y ingresos, podras visualizar un resumen gráfico del porcentaje de gastos e ingresos distribuidos por categorías específicas.
4. Ventana de Administración (Solo Administradores):
    - Accede a una vista exclusiva para administradores donde podrás:
    - Visualizar todos los usuarios registrados en la base de datos.
    - Gestionar la desactivacion y activacion de las cuentas de los usuarios.

## 📌 Endpoints

/login

<img src="public/images/screenshoots/Captura-login.png" alt="Login de PocketLog" width="1000">

/register

<img src="public/images/screenshoots/Captura-register.png" alt="Registro de PocketLog" width="1000">

/transaction

<img src="public/images/screenshoots/Captura-home.png" alt="Menu de transacciones" width="1000">
<img src="public/images/screenshoots/Captura resumen.png" alt="Modal resumen ingresos" width="1000">

/expense/new - /income/new

<img src="public/images/screenshoots/Captura-crear-ingreso.png" alt="Crear un ingreso" width="1000">

/expense/:id/update - /income/:id/update

<img src="public/images/screenshoots/Captura-editar-gasto.png" alt="Editar un gasto" width="1000">

/user

<img src="public/images/screenshoots/Captura-administrador-usuarios.png" alt="Administrador de usuarios" width="1000">

## 👥 Colaboradores

[![GitHub](https://img.shields.io/badge/GitHub-@kareaga95-blue?style=flat-square&logo=github)](https://github.com/kareaga95)
[![GitHub](https://img.shields.io/badge/GitHub-@JorgePascualFuentecilla-blue?style=flat-square&logo=github)](https://github.com/JorgePascualFuentecilla)
[![GitHub](https://img.shields.io/badge/GitHub-@4n7n-blue?style=flat-square&logo=github)](https://github.com/4n7n)
[![GitHub](https://img.shields.io/badge/GitHub-@YerBrown-blue?style=flat-square&logo=github)](https://github.com/YerBrown)
