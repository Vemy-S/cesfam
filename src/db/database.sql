CREATE DATABASE IF NOT EXISTS cesfamdb;

USE cesfamdb;

CREATE TABLE user(
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_rut VARCHAR(250) NOT NULL,
    user_name VARCHAR(45) NOT NULL,
    user_lastname VARCHAR(45) NOT NULL,
    user_birthdate DATE NOT NULL,
    user_address VARCHAR (255),
    user_phone VARCHAR(15) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(100) NOT NULL

);

CREATE TABLE cesfam(
    cesfam_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cesfam_name VARCHAR(50) NOT NULL,
    cesfam_phone VARCHAR(15) NOT NULL,
    cesfam_address VARCHAR(100) NOT NULL

);

CREATE TABLE doctor(
    doctor_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    doctor_rut VARCHAR(255) NOT NULL,
    doctor_name VARCHAR(45) NOT NULL,
    doctor_lastname VARCHAR(45) NOT NULL,
    doctor_phone VARCHAR(15) NOT NULL,
    doctor_email VARCHAR(50) NOT NULL UNIQUE,
    doctor_speciality VARCHAR(100) NOT NULL,
    doctor_password VARCHAR(50) NOT NULL,

    cesfam_id INT,

    FOREIGN KEY (cesfam_id) REFERENCES cesfam(cesfam_id)
    
);

CREATE TABLE medical_appointment(
    appointment_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    appointment_date DATETIME NOT NULL,
    appointment_status BOOLEAN DEFAULT FALSE,
    appointment_title VARCHAR(255) NOT NULL,
    appointment_description VARCHAR(255) NOT NULL,

    user_id INT,
    doctor_id INT,
    cesfam_id INT,

    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor (doctor_id),
    FOREIGN KEY (cesfam_id) REFERENCES cesfam (cesfam_id)


);

