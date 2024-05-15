import { pool } from "../db.js";

// Controlador para actualizar la información del usuario
export const infoUpdate = async (req, res) => {
  const { user_rut } = req.user; // Extraer el user_rut del usuario autenticado
  const { user_email, user_phone, user_address } = req.body;

 

  try {

    if (!user_email || !user_phone || !user_address) {
        console.log(user_email, user_phone, user_address)
        return res.status(400).json({ message: "Email, phone, and address are required." });
      }

      

    const updateUser = await pool.query(
      "UPDATE user SET user_email = ?, user_phone = ?, user_address = ? WHERE user_rut = ?",
      [user_email, user_phone, user_address, user_rut]
    );

    res.json({ message: "User information updated successfully." });
  } catch (error) {
    console.error("Error updating user information:", error.message);
    res.status(500).json({ message: "Failed to update user information." });
  }
};
