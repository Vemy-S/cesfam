CREATE DATABASE IF NOT EXISTS cesfamdb;

USE cesfamdb;

CREATE TABLE cesfam(
    cesfam_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cesfam_name VARCHAR(50) NOT NULL,
    cesfam_phone INT NOT NULL,
    cesfam_address VARCHAR(100) NOT NULL

);

INSERT INTO cesfam (cesfam_id, cesfam_name, cesfam_phone, cesfam_address) 
VALUES(1,'Cesfam el real', 342493734,'Cajales 1900, San Felipe, Valparaíso');
INSERT INTO cesfam (cesfam_id, cesfam_name, cesfam_phone, cesfam_address)
VALUES(2,'Cesfam Segismundo',342507300, 'Avenida Santa Teresa 370 Villa Las Acacias, San Felipe, Valparaíso');

CREATE TABLE user(
    user_rut INT PRIMARY KEY NOT NULL,
    user_fullname VARCHAR(45) NOT NULL,
    user_birthdate DATE NOT NULL,
    user_address VARCHAR (255),
    user_phone INT NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_uniquekey VARCHAR(100) UNIQUE NOT NULL,
    user_


    cesfam_id INT,

    FOREIGN KEY(cesfam_id) REFERENCES cesfam(cesfam_id)
);


CREATE TABLE doctor(
    doctor_rut INT PRIMARY KEY NOT NULL,
    doctor_fullname VARCHAR(45) NOT NULL,
    doctor_phone INT NOT NULL,
    doctor_email VARCHAR(50) NOT NULL UNIQUE,
    doctor_speciality VARCHAR(100) NOT NULL,
    doctor_password VARCHAR(50) NOT NULL, 
    cesfam_id INT,

    FOREIGN KEY (cesfam_id) REFERENCES cesfam(cesfam_id)
    
);
INSERT INTO doctor (doctor_rut, doctor_fullname, doctor_phone, doctor_email, doctor_speciality, doctor_password, cesfam_id)
VALUES
( 205422704, 'Diego Silva Romero Lopez', 958645243, 'DiegoSg@gmail.com','Medico General','DiegoRomero32', 1),
( 205431704, 'Bastian Silva Rodrigo Olivares', 958795243, 'BastiSilva@gmail.com','Medico general', 'BastRodrigo45', 2),
( 205472705, 'María González Pérez', 968745123, 'MariaGonzalez@gmail.com',  'Pediatra', 'GonzalezPe34',2 ),
( 205452706, 'Carlos Martínez Rodríguez', 978635478, 'CarlosMartinez@gmail.com', 'Cardiólogo','MartCa94', 1),
( 205492707, 'Ana López García', 947856321, 'AnaLopez@gmail.com',  'Dermatólogo','LopGarc94', 1),
( 205402708, 'Javier Pérez Sánchez', 956734589, 'JavierPerez@gmail.com',  'Psiquiatra','JavierSahez65', 2),
( 205421709, 'Laura Rodríguez Martínez', 965478213, 'LauraRodriguez@gmail.com',  'Ginecólogo','Rodriguez99', 1),
( 205456710, 'Pedro Sánchez López', 978563214, 'PedroSanchez@gmail.com', 'Oftalmólogo','LoPeSa942', 2);

CREATE TABLE medical_appointment(
    appointment_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    appointment_date DATETIME NOT NULL,
    appointment_status BOOLEAN DEFAULT TRUE,
    

    user_rut INT,
    doctor_rut INT,
    cesfam_id INT,

    FOREIGN KEY (user_rut) REFERENCES user (user_rut),
    FOREIGN KEY (doctor_rut) REFERENCES doctor (doctor_rut),
    FOREIGN KEY (cesfam_id) REFERENCES cesfam (cesfam_id)

);

INSERT INTO medical_appointment(appointment_id, appointment_date, appointment_status, user_rut, doctor_rut, cesfam_id)
VALUES
(1, CURRENT_TIMESTAMP(), TRUE, '210009361', '205422704',1),
(2, CURRENT_TIMESTAMP(), TRUE, '205422706', '205452706',1),
(3, CURRENT_TIMESTAMP(), TRUE, '107896512', '205402708',2),
(4, CURRENT_TIMESTAMP(), TRUE, '109864238', '205456710',2),
(5, CURRENT_TIMESTAMP(), TRUE, '105422708', '205421709',1),
(6, CURRENT_TIMESTAMP(), TRUE, '207896514', '205456710',2),
(7, CURRENT_TIMESTAMP(), TRUE, '207896513', '205472705',2),
(8, CURRENT_TIMESTAMP(), TRUE, '205216789', '205492707',1),
(9, CURRENT_TIMESTAMP(), TRUE, '108753621', '205452706',1),
(10, CURRENT_TIMESTAMP(), TRUE, '209876234', '205456710',2);

DROP TABLE user;
DROP TABLE medical_appointment;
DROP TABLE doctor;
DROP TABLE cesfam;

INSERT INTO user (user_rut, user_fullname, user_birthdate, user_address, user_phone, user_email, user_uniquekey, cesfam_id) 
VALUES 
(210009361, 'Damarys Ayleen Silva Garcia', '2002-04-15', 'Villa Cordillera 165', 934513464, 'damarys.asg@gmail.com', 'Ds151509.', 1),
(205422706, 'Jeremy William Vega Fuenzalida', '2001-04-06', 'Villa los Alamos, San Felipe', 958645204, 'jeremyvf16@gmail.com', 'JVemyS1$', 1),
(205422707, 'Camila Andrea González Fuentes', '1992-09-25', 'Av. Los Olivos #456, San Felipe', 958632145, 'camilagonzalez92@example.com', 'CamilaGF92@', 1),
(208745623, 'Juan Carlos Herrera Soto', '1985-05-12', 'Calle Los Sauces #789, San Felipe', 958632587, 'juanherrera85@example.com', 'JuanHSoto85#', 1),
(107896512, 'María José Sánchez Vergara', '1980-11-30', 'Av. Las Acacias #234, Viña del Mar', 974125836, 'mariajose@example.com', 'MJSanchez80@', 2),
(109864237, 'Pedro Pablo Gómez Rojas', '1998-03-17', 'Calle Los Laureles #567, Viña del Mar', 974589632, 'pedropablo@example.com', 'PPGRojas98@', 2),
(205216789, 'Patricia Andrea González Soto', '1991-02-28', 'Calle Los Arrayanes #987, San Felipe', 958632180, 'patriciags@example.com', 'PatriciaGS91@', 1),
(108964510, 'Martín Ignacio Pérez Torres', '1982-11-15', 'Av. Las Palmeras #654, San Felipe', 958632181, 'martinperez@example.com', 'MartinPTorres82@', 1),
(105672410, 'Laura Andrea Rojas Pérez', '1990-08-14', 'Av. Los Jazmines #789, San Felipe', 958632189, 'laurarojas90@example.com', 'LauraRPerez90@', 1),
(212345698, 'Sofía Alejandra Ramírez Pérez', '1987-07-10', 'Calle Los Cipreses #789, Viña del Mar', 974125845, 'sofiaramirez@example.com', 'SofiaRPerez87@', 2),
(209785412, 'Mateo Sebastián Silva López', '1995-04-02', 'Av. Los Abedules #456, Viña del Mar', 974589630, 'mateosilva@example.com', 'MateoSLopez95@', 2),
(112345690, 'Joaquín Andrés Rodríguez Vásquez', '1980-05-25', 'Av. Las Magnolias #654, Viña del Mar', 974125846, 'joaquinrodriguez@example.com', 'JRodriguez80@', 2),
(205216790, 'Catalina Paz Gómez Rojas', '1986-09-12', 'Calle Los Tulipanes #321, San Felipe', 958632182, 'catalinagomez@example.com', 'CatalinaGRojas86@', 1),
(105422708, 'Daniela Paz Valenzuela López', '1987-07-02', 'Calle El Mirador #321, San Felipe', 958632154, 'danielaval@example.com',  'DPValenzuela87#', 1),
(205672419, 'Valentina Paz Soto Rojas', '1985-03-19', 'Calle Los Girasoles #321, San Felipe', 958632190, 'valentinasoto@example.com', 'VPSoto85@', 1),
(209876234, 'Diego Alejandro Martínez Vargas', '1979-09-10', 'Av. Las Orquídeas #456, Viña del Mar', 974125839, 'diegomartinez@example.com',  'DAMartinez79@', 2),
(207896513, 'Fernando José Mendoza Silva', '1976-01-18', 'Av. Los Pinos #456, Viña del Mar', 974125837, 'fernando@example.com',  'FJMendoza76@', 2),
(105672420, 'Felipe Andrés Ramírez Pérez', '1993-10-05', 'Calle Los Lirios #123, San Felipe', 958632183, 'feliperamirez@example.com',  'FelipeRPerez93@', 1),
(108753621, 'Gabriel Antonio Morales Castillo', '1983-04-27', 'Calle Las Rosas #456, San Felipe', 958632187, 'gabrielmorales83@example.com',  'GabrielMC83@', 1),
(109864238, 'Marcela Paz Torres Soto', '1989-12-20', 'Av. Las Camelias #789, Viña del Mar', 974589634, 'marcelatorres@example.com',  'MarcelaTSoto89@', 2),
(207896514, 'Javier Alejandro Ruiz González', '1981-08-15', 'Av. Las Gardenias #987, Viña del Mar', 974125838, 'javierruiz@example.com',  'JavierRGonzalez81@', 2),
(207444514, ' Alejandro Ruiz González', '1981-08-15', 'Av. Las Gardenias #987, Viña del Mar', 974192838, 'javier12z@example.com',  'JavierRlez81@', 1);
