import { pool } from "../db.js";

export const userHistory = async (req, res) => {
  const { user_rut } = req.user;

  try {
    const historyUser = await pool.query(
      "SELECT * FROM hour_reservation WHERE user_rut = ?",
      [user_rut]
    );

    res.send(historyUser);
  } catch (error) {
    console.log(error.message);
  }
};

// el user_rut  de user tiene que ser el mismo user_rut que la tabla de hour_reservation.
// Pre condicion de esto es que requiere que el usuario este logeado.
