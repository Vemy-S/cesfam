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

export const userInfo = async (req, res) =>{
  const { user_rut } = req.user;

  try {
    const userInfo = await pool.query(
      "SELECT * FROM user WHERE user_rut = ?",
      [user_rut]
    );

    res.send({
      rut: userInfo[0][0].user_rut,
      fullname: userInfo[0][0].user_fullname,
      user_birthdate: userInfo[0][0].user_birthdate,
      user_address: userInfo[0][0].user_address,
      user_phone: userInfo[0][0].user_phone,
      user_email: userInfo[0][0].user_email,
      user_hourstatus: userInfo[0][0].user_hourstatus, // Para verificar si tiene hora activa.
      user_counthours: userInfo[0][0].user_counthours,
      cesfam_id: userInfo[0][0].cesfam_id,
    });

  } catch (error) {
    console.log(error.message);
  }
}


