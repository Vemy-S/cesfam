import { pool } from "../db.js";

export const hourReservation = async (req, res) => {
  const { medicalhour_id, medicalhour_time, reservation_description } =
    req.body;

  const { user_rut, user_cancelcount, user_counthours } = req.user; // Se puede extraer info asi.
  console.log(`Probando si extrae el rut po loco q onda ${user_rut}`);

  console.log("Info del usuario desde el otro lao k guea", req.user);

  try {
    //Extraer STATUS => Ya no se necesita, se extrae del usuario logeado
    const statusUser = await pool.query(
      "SELECT user_hourstatus FROM user WHERE user_rut = ?",
      [user_rut]
    );

    const statusHour = await pool.query(
      "SELECT medicalhour_status FROM medicalhour WHERE medicalhour_id = ?",
      [medicalhour_id]
    );

    const status_user = statusUser[0][0].user_hourstatus;
    const status_time = statusHour[0][0].medicalhour_status;

    //Condiciones
    if (status_time === 0) {
      return res.status(404).json({ message: "Time not available" });
    }

    if (status_user === 1) {
      return res
        .status(404)
        .json({ message: "User already has a reserved time" });
    }
    //Condicion de cancelacion
    if (user_cancelcount > 1){
      return res.status(404).json({ message: "User has reached the limit of cancellations" });
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

    //Contar horas tomadas a lo largo del tiempo
    const contHours = await pool.query('UPDATE user SET user_counthours = user_counthours + 1 WHERE user_rut = ?', [user_rut])

    //Tomar hora
    const takeHour = await pool.query(
      "INSERT INTO hour_reservation (medicalhour_id, user_rut, medicalhour_time, reservation_description ) VALUES (?,?,?,?)",
      [medicalhour_id, user_rut, medicalhour_time, reservation_description]
    );


    res.json({ message: "Reserved time succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// => Hay que revisarlo
export const cancelReservation = async (req, res) => {
  const { user_rut, user_hourstatus } = req.user;
  try {
    console.log(user_hourstatus)

    if(user_hourstatus === 0){
      return res.status(404).json({"message":"User has no reserved time"})
    }

    const cancelHour = await pool.query(
      "UPDATE user SET user_hourstatus = FALSE WHERE user_rut = ?",
      [user_rut]
    );

    const updateCount = await pool.query(
      "UPDATE user SET user_cancelcount = user_cancelcount + 1 WHERE user_rut = ?",
      [user_rut]
    );

    res.send("Reservation canceled");
  } catch (error) {
    console.log(error.message);
  }
};
