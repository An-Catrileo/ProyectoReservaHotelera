# Diagrama de Base de Datos Hotel

```mermaid
erDiagram
    USERS {
        id int PK
        name string
        email string
        phone string
        country string
        city string
        email_verified_at timestamp
        password string
        remember_token string
        created_at timestamp
        updated_at timestamp
    }

    ROOMS {
        id int PK
        name string
        slug string
        entry text
        description text
        quantity smallint
        price decimal
        active boolean
        adults tinyint
        kids tinyint
        img string
        thumb string
        home boolean
        about boolean
        created_at timestamp
        updated_at timestamp
    }

    RESERVATIONS {
        id int PK
        code string
        start_date date
        end_date date
        adults tinyint
        kids tinyint
        quantity int
        check_in string
        special_request text
        state string
        payment_status enum
        nights tinyint
        price decimal
        sub_total decimal
        tax_amount float
        tax_percent tinyint
        total decimal
        deposit_amount decimal
        remaining_amount decimal
        data json
        offer json
        room_id int FK
        user_id int FK
        discount_id int FK
        created_at timestamp
        updated_at timestamp
    }

    PAYMENTS {
        id int PK
        reservation_id int FK
        transaction_id string
        amount decimal
        type enum
        status enum
        payment_method enum
        payment_details json
        created_at timestamp
        updated_at timestamp
    }

    COMPLEMENTS {
        id int PK
        name string
        icon string
        price decimal
        type_price enum
        entry text
        active boolean
        created_at timestamp
        updated_at timestamp
    }

    BEDS {
        id int PK
        name string
        entry text
        icon string
        created_at timestamp
        updated_at timestamp
    }

    AMENITIES {
        id int PK
        name string
        icon string
        entry text
        created_at timestamp
        updated_at timestamp
    }

    OFFERS {
        id int PK
        name string
        nights tinyint
        percent float
        created_at timestamp
        updated_at timestamp
    }

    DISCOUNTS {
        id int PK
        code string
        percent tinyint
        quantity int
        active boolean
        deleted_at timestamp
        created_at timestamp
        updated_at timestamp
    }

    IMAGES {
        id int PK
        img string
        thumb string
        order tinyint
        alt string
        title string
        model_type string
        model_id int
        created_at timestamp
        updated_at timestamp
    }

    BED_ROOM {
        id int PK
        bed_id int FK
        room_id int FK
        quantity tinyint
    }

    AMENITY_ROOM {
        id int PK
        room_id int FK
        amenity_id int FK
    }

    COMPLEMENT_ROOM {
        id int PK
        complement_id int FK
        room_id int FK
    }

    USERS ||--o{ RESERVATIONS : tiene
    ROOMS ||--o{ RESERVATIONS : tiene
    DISCOUNTS ||--o{ RESERVATIONS : aplica

    RESERVATIONS ||--o{ PAYMENTS : tiene

    ROOMS ||--o{ BED_ROOM : tiene
    BEDS ||--o{ BED_ROOM : asignado_a

    ROOMS ||--o{ AMENITY_ROOM : tiene
    AMENITIES ||--o{ AMENITY_ROOM : asignado_a

    ROOMS ||--o{ COMPLEMENT_ROOM : tiene
    COMPLEMENTS ||--o{ COMPLEMENT_ROOM : asignado_a

    ROOMS ||--o{ IMAGES : tiene
```

## Descripción de Tablas Principales

### Users (Usuarios)

Almacena información de los usuarios registrados en el sistema, incluyendo datos de contacto como nombre, correo electrónico, teléfono, país y ciudad.

### Rooms (Habitaciones)

Contiene información sobre las habitaciones disponibles en el hotel, incluyendo nombre, descripción, precio, capacidad y características.

### Reservations (Reservaciones)

Registra las reservaciones realizadas por los usuarios, incluyendo fechas de entrada y salida, número de huéspedes, estado del pago y montos.

### Payments (Pagos)

Almacena información sobre los pagos realizados para cada reservación, incluyendo método de pago, monto y estado de la transacción.

### Complements (Complementos)

Servicios adicionales que pueden añadirse a las habitaciones, como desayuno, transporte, etc.

### Beds (Camas)

Tipos de camas disponibles que pueden asignarse a las habitaciones.

### Amenities (Comodidades)

Comodidades o servicios disponibles en las habitaciones, como Wi-Fi, aire acondicionado, etc.

### Offers (Ofertas)

Ofertas especiales basadas en número de noches.

### Discounts (Descuentos)

Códigos de descuento que pueden aplicarse a las reservaciones.

## Relaciones Principales

-   Cada usuario puede tener múltiples reservaciones
-   Cada habitación puede tener múltiples reservaciones
-   Cada reservación puede tener múltiples pagos
-   Las habitaciones pueden tener múltiples camas, amenidades y complementos
-   Las imágenes pueden estar asociadas a diferentes modelos como habitaciones
