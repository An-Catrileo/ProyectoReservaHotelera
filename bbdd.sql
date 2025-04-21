-- Tabla: room_categories
CREATE TABLE room_categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tabla: room_statuses
CREATE TABLE room_statuses (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);

-- Tabla: roles
CREATE TABLE roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Tabla: users
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME
);

-- Tabla: clients
CREATE TABLE clients (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id_user)
);

-- Tabla: employees
CREATE TABLE employees (
    id_employee INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    position VARCHAR(100),
    hire_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id_user)
);

-- Tabla: user_roles
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (role_id) REFERENCES roles(id_role)
);

-- Tabla: rooms
CREATE TABLE rooms (
    id_room INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL,
    room_type VARCHAR(50),
    capacity INT,
    daily_price DECIMAL(10, 2),
    category_id INT,
    status_id INT,
    floor VARCHAR(50),
    view VARCHAR(50),
    responsible_admin_id INT,
    FOREIGN KEY (category_id) REFERENCES room_categories(id_category),
    FOREIGN KEY (status_id) REFERENCES room_statuses(id_status),
    FOREIGN KEY (responsible_admin_id) REFERENCES users(id_user)
);

-- Tabla: reservation_statuses
CREATE TABLE reservation_statuses (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);

-- Tabla: reservations
CREATE TABLE reservations (
    id_reservation INT AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATETIME NOT NULL,
    check_out_date DATETIME NOT NULL,
    total_cost DECIMAL(10, 2),
    advance_payment DECIMAL(10, 2),
    remaining_balance DECIMAL(10, 2),
    client_id INT,
    room_id INT,
    reservation_status_id INT,
    created_at DATETIME,
    notes TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id_client),
    FOREIGN KEY (room_id) REFERENCES rooms(id_room),
    FOREIGN KEY (reservation_status_id) REFERENCES reservation_statuses(id_status)
);

-- Tabla: reservation_tickets
CREATE TABLE reservation_tickets (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    qr_code TEXT,
    details TEXT,
    reservation_id INT UNIQUE,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id_reservation)
);

-- Tabla: payment_methods
CREATE TABLE payment_methods (
    id_method INT AUTO_INCREMENT PRIMARY KEY,
    method_name VARCHAR(50) NOT NULL
);

-- Tabla: payment_statuses
CREATE TABLE payment_statuses (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);

-- Tabla: payments
CREATE TABLE payments (
    id_payment INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATETIME NOT NULL,
    reservation_id INT UNIQUE,
    payment_method_id INT,
    payment_status_id INT,
    payment_type VARCHAR(20),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id_reservation),
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id_method),
    FOREIGN KEY (payment_status_id) REFERENCES payment_statuses(id_status)
);

-- Agregar categorías de habitación
INSERT INTO room_categories (category_name, description) VALUES ('Estándar', 'Habitación básica con servicios esenciales.');
INSERT INTO room_categories (category_name, description) VALUES ('Suite de Lujo', 'Habitación amplia con comodidades premium y vistas panorámicas.');

-- Agregar estados de habitación
INSERT INTO room_statuses (status_name) VALUES ('Disponible');
INSERT INTO room_statuses (status_name) VALUES ('Ocupada');
INSERT INTO room_statuses (status_name) VALUES ('Mantenimiento');

-- Agregar roles de usuario
INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('employee');
INSERT INTO roles (role_name) VALUES ('client');

-- Agregar usuarios (empleado y cliente)
INSERT INTO users (name, email, password, user_type, created_at) VALUES ('Admin Hotel', 'admin@hotel.com', 'admin123', 'admin', NOW());
INSERT INTO users (name, email, password, user_type, created_at) VALUES ('Recepcionista Uno', 'recep1@hotel.com', 'recep456', 'employee', NOW());
INSERT INTO users (name, email, password, user_type, created_at) VALUES ('Cliente Feliz', 'cliente@email.com', 'cliente789', 'client', NOW());

-- Agregar clientes (vinculando a usuarios)
INSERT INTO clients (user_id, name, email) VALUES (3, 'Cliente Feliz', 'cliente@email.com');

-- Agregar empleados (vinculando a usuarios)
INSERT INTO employees (user_id, position, hire_date) VALUES (2, 'Recepcionista', '2025-04-25');

-- Asignar roles a usuarios
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin es admin
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2); -- Recepcionista es empleado
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3); -- Cliente es cliente

-- Agregar habitaciones
INSERT INTO rooms (room_number, room_type, capacity, daily_price, category_id, status_id, responsible_admin_id) VALUES ('101', 'Doble', 2, 75.50, 1, 1, 1);
INSERT INTO rooms (room_number, room_type, capacity, daily_price, category_id, status_id, responsible_admin_id) VALUES ('205', 'Suite', 4, 150.00, 2, 1, 1);
INSERT INTO rooms (room_number, room_type, capacity, daily_price, category_id, status_id, responsible_admin_id) VALUES ('102', 'Doble', 2, 75.50, 1, 2, 1); -- Ocupada

-- Agregar estados de reserva
INSERT INTO reservation_statuses (status_name) VALUES ('Pendiente');
INSERT INTO reservation_statuses (status_name) VALUES ('Confirmada');
INSERT INTO reservation_statuses (status_name) VALUES ('Cancelada');

-- Agregar métodos de pago
INSERT INTO payment_methods (method_name) VALUES ('Tarjeta de Crédito');
INSERT INTO payment_methods (method_name) VALUES ('Efectivo');
INSERT INTO payment_methods (method_name) VALUES ('Transferencia Bancaria');

-- Agregar estados de pago
INSERT INTO payment_statuses (status_name) VALUES ('Pendiente');
INSERT INTO payment_statuses (status_name) VALUES ('Pagado');
INSERT INTO payment_statuses (status_name) VALUES ('Reembolsado');

-- Agregar una reserva de ejemplo
INSERT INTO reservations (check_in_date, check_out_date, total_cost, advance_payment, client_id, room_id, reservation_status_id, created_at)
VALUES ('2025-05-01 14:00:00', '2025-05-05 11:00:00', 302.00, 90.60, 1, 1, 2, NOW());

-- Agregar un pago para la reserva
INSERT INTO payments (amount, payment_date, reservation_id, payment_method_id, payment_status_id, payment_type)
VALUES (90.60, NOW(), 1, 1, 2, 'Deposito');

-- Agregar un ticket de reserva
INSERT INTO reservation_tickets (qr_code, details, reservation_id)
VALUES ('QRCODE123', 'Detalles de la reserva del cliente.', 1);