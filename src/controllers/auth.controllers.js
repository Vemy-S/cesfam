import { pool } from "../db.js";
import { createAccesToken } from "../libs/jwt.js";

export const loginuser = async (req, res) => {
  const { user_rut, user_uniquekey } = req.body;

  try {

    const findUser = await pool.query(
      "SELECT * from user WHERE user_rut = ? AND user_uniquekey = ?",
      [user_rut, user_uniquekey]
    );

    const user = findUser[0];

    console.log(`email del usuario ${user.user_email}`);

    if (user.length === 0) {
      return res.status(404).json({ message: "Rut or password is invalid" });
    }

    const token = await createAccesToken({ user });
    res.cookie("token", token);


    //Buscar si existe sesion
    const existingSession = await pool.query(
      "SELECT session_id FROM active_sessions WHERE user_rut = ?",
      [user_rut]
    );

    const existingRows = existingSession[0]
    console.log(`probando length ${existingRows.length}`)

    //Permitir 1 sola session
    if (existingRows.length >= 1) {
      return res.status(403).json({ message: "User already logged in" });
    }

    // Crear sesion activa
    const activeSession = await pool.query(
      "INSERT INTO active_sessions (session_token, session_logintime, user_rut) VALUES (?, ?, ?)",
      [token, new Date(), user_rut]
    );

    //Seguimiento logeos
    const allSessions = await pool.query(
      "INSERT INTO login_history (login_time, user_rut) VALUES (?, ?)",
      [new Date(), user_rut]
    );

    res.json({ message: "Login succesfully", redirectToIndex: "/inicio.html" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logindoctor = async (req, res) => {
  const { doctor_rut, doctor_password } = req.body;
  try {
    const findDoctor = await pool.query(
      "SELECT * from doctor WHERE doctor_rut = ? AND doctor_password = ?",
      [doctor_rut, doctor_password]
    );

    const doctor = findDoctor[0];

    if (doctor.length === 0) {
      return res.status(404).json({ message: "Rut or password is invalid" });
    }

    const token = await createAccesToken({ doctor });
    res.cookie("token", token);

    res.send(findDoctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = (req, res) => {
  try {
    res.send("Registrando");
  } catch (error) {
    console.log(error); // temporal
  }
};

export const profile = (req, res) => {
  try {
    res.send("Profile");
  } catch (error) {
    console.log(error); // temporal
  }
};

export const logout = async (req, res) => {
  const { user_rut } = req.user;

  try {
    console.log(`User rut ${user_rut}`);

    const deleteToken = await pool.query(
      "DELETE FROM active_sessions WHERE user_rut = ?",
      [user_rut]
    );

    res.cookie("token", "", {
      expires: new Date(0),
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
