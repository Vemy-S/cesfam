import { pool } from "../db.js";

export const getHours = async (req, res) => {
  try {
    const hours = await pool.query(
      "SELECT * FROM medicalhour WHERE medicalhour_status = TRUE"
    );
    res.json(hours);
  } catch (error) {
    console.error(error.message);
  }
};

export const hourReservation = async (req, res) => {
  const { medicalhour_id, user_rut, medicalhour_time } = req.body;
  try {
    //Extraer STATUS
    const statusUser = await pool.query(
      "SELECT user_hourstatus FROM user WHERE user_rut = ?",
      [user_rut]
    );
    const status = await pool.query(
      "SELECT medicalhour_status FROM medicalhour WHERE medicalhour_id = ?",
      [medicalhour_id]
    );

    const status_user = statusUser[0][0].user_hourstatus;
    const status_time = status[0][0].medicalhour_status;
    //Condiciones
    if (status_time === 0) {
      return res.status(404).json({ message: "Time not available" });
    }
    if (status_user === 1) {
      return res
        .status(404)
        .json({ message: "User already has a reserved time" });
    }

    //Updates
    const updateHour = await pool.query(
      "UPDATE medicalhour SET medicalhour_status = FALSE WHERE medicalhour_id = ?",
      [medicalhour_id]
    );
    const updatehourUser = await pool.query(
      "UPDATE user SET user_hourstatus = TRUE WHERE user_rut = ?",
      [user_rut]
    );

    //Tomar hora
    const takeHour = await pool.query(
      "INSERT INTO hour_reservation (medicalhour_id, user_rut, medicalhour_time) VALUES (?,?,?)",
      [medicalhour_id, user_rut, medicalhour_time]
    );

    res.json({ message: "Reserved time succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const cancelReservation = async (req, res) => {
  const { medicalhour_id, user_rut } = req.body;
  try {
    const status = await pool.query(
      "SELECT medicalhour_status FROM medicalhour WHERE medicalhour_id = ?",
      [medicalhour_id]
    );
    const status_time = status[0][0].medicalhour_status;

    if (status_time === 1) {
      return res.status(404).json({ message: "Time not reserved" });
    }

    const updateHour = await pool.query(
      "UPDATE medicalhour SET medicalhour_status = TRUE WHERE medicalhour_id = ?",
      medicalhour_id
    );
    const cancelHour = await pool.query(
      "DELETE FROM hour_reservation WHERE medicalhour_id = ? AND user_rut = ?",
      [medicalhour_id, user_rut]
    );

    res.json({ message: "Reservation canceled" });
  } catch (error) {
    console.log(error.message);
  }
};
