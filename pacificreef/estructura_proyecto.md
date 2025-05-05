# Estructura del Proyecto de Reservas de Hotel

## Estructura de directorios principales

-   **app/** - Contiene la lógica principal de la aplicación Laravel

    -   **Http/Controllers/** - Controladores de la aplicación
    -   **Models/** - Modelos de datos
    -   **Policies/** - Políticas de autorización
    -   **Providers/** - Proveedores de servicios

-   **resources/** - Contiene vistas, assets y archivos React/Inertia

    -   **js/** - Archivos JavaScript, React y Inertia
    -   **css/** - Archivos CSS y Tailwind
    -   **views/** - Vistas Blade (si se usan)

-   **routes/** - Define las rutas de la aplicación

    -   **web.php** - Rutas de la web
    -   **api.php** - Rutas de la API

-   **database/** - Contiene migraciones, seeders y factories

    -   **migrations/** - Definiciones de la estructura de la base de datos
    -   **seeders/** - Datos iniciales para la base de datos
    -   **factories/** - Fábricas para pruebas

-   **public/** - Archivos públicos accesibles desde el navegador

    -   **images/** - Imágenes públicas
    -   **js/**, **css/** - Archivos compilados

-   **config/** - Configuraciones de la aplicación

## Archivos clave para el desarrollo

### Modelos principales

-   `app/Models/User.php`
-   `app/Models/Room.php`
-   `app/Models/Reservation.php`
-   `app/Models/Complement.php`

### Controladores principales

-   `app/Http/Controllers/RoomController.php`
-   `app/Http/Controllers/ReservationController.php`
-   `app/Http/Controllers/Admin/`

### Vistas React/Inertia

-   `resources/js/Pages/`
-   `resources/js/Components/`
-   `resources/js/Layouts/`

### Estilos

-   `resources/css/app.css`
-   `tailwind.config.js`

### Rutas

-   `routes/web.php`

### Configuración

-   `config/app.php`
-   `config/database.php`
-   `.env` (variables de entorno)
