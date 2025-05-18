CREATE DATABASE ticket_db;
USE ticket_db;

CREATE TABLE showtime_seats (
    showtime_id INT,
    seat_id INT,
    status ENUM('available', 'booked') DEFAULT 'available',
    PRIMARY KEY (showtime_id, seat_id)
);

CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    showtime_id INT NOT NULL,
    seat_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE customer_db;
USE customer_db;

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);