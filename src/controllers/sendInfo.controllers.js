import { pool } from "../db.js";

export const userHistory = async (req, res) => {
  const { user_rut } = req.user;

  try {
    const historyUser = await pool.query(
      "SELECT * FROM hour_reservation WHERE user_rut = ?",
      [user_rut]
    );

    console.log(
      `DEVUELVE LA INFO O NO  ${historyUser[0][0].reservation_description} AAAA LA DEVUELVE COMO OBJECT CON RAZON TIRA UNDEFINED PO`
    );

    res.send({
      reservation_id: historyUser[0][0].reservation_id,
      reservation_date: historyUser[0][0].reservation_date,
      reservation_description: historyUser[0][0].reservation_description,
      reservation_status: historyUser[0][0].reservation_status,
      medicalhour_time: historyUser[0][0].medicalhour_time,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const userInfo = async (req, res) => {
  const { user_rut } = req.user;

  try {
    const userInfo = await pool.query("SELECT u.user_rut, u.user_phone, u.user_counthours, u.user_fullname, u.user_birthdate, u.user_address, u.user_email, c.cesfam_name FROM user u left join cesfam c on u.cesfam_id = c.cesfam_id WHERE user_rut = ? ;", [
      user_rut,
    ]);

    res.send({
      rut: userInfo[0][0].user_rut,
      fullname: userInfo[0][0].user_fullname,
      user_birthdate: userInfo[0][0].user_birthdate,
      user_address: userInfo[0][0].user_address,
      user_phone: userInfo[0][0].user_phone,
      user_email: userInfo[0][0].user_email,
      user_hourstatus: userInfo[0][0].user_hourstatus, // Para verificar si tiene hora activa.
      user_counthours: userInfo[0][0].user_counthours,
      cesfam_name: userInfo[0][0].cesfam_name,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const infoHour = async (req, res) => {
  try {
    const hourWithDoctor = await pool.query(
      "select m.medicalhour_id, m.medicalhour_time, m.medicalhour_status, c.cesfam_name , d.doctor_rut, d.doctor_fullname from medicalhour m left join doctor d on m.doctor_rut = d.doctor_rut left join cesfam c on c.cesfam_id = d.cesfam_id;"
    );

    const responseData = hourWithDoctor[0].map(hour =>{
      return {
        medicalhour_id: hour.medicalhour_id,
        medicalhour_time: hour.medicalhour_time,
        medicalhour_status: hour.medicalhour_status,
        doctor_rut: hour.doctor_rut,
        doctor_fullname: hour.doctor_fullname,
        cesfam_name: hour.cesfam_name
      }

    })
   
    res.send({
      responseData
    });
  } catch (error) {
    console.log(error.message);
  }
};
