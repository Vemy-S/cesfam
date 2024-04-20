import { Router } from "express";
import { pool } from "../db.js";
import twilio from "twilio";
import nodemailer from "nodemailer";

const accountSid = "ACfa4786ad324dab80b9634fcbd1715db3"; // Tu SID de cuenta de Twilio
const authToken = "f56955b857c51d6b436ff382c614f597"; // Tu token de autenticación de Twilio
const client = twilio(accountSid, authToken); // Crear cliente Twilio

const router = Router();

router.get("/message", (req, res) => {
  client.messages
    .create({
      body: "Como estas soy jeremy probando esta cosa",
      from: "+13185350659",
      to: "+56 9 7370 9668",
    })
    .then((message) => {
      console.log("Mensaje enviado con SID:", message.sid);
      res.send("Mensaje enviado correctamente po loco");
    })
    .catch((error) => {
      console.error("Error al enviar el mensaje:", error);
      res.status(500).send("Error al enviar el mensaje");
    });
});

router.get("/info", async (req, res) => {
  try {
    const info = await pool.query(
      "SELECT u.user_rut, hr.medicalhour_time, hr.reservation_date, hr.reservation_id  from user u left join hour_reservation hr on u.user_rut = hr.user_rut"
    );
    res.json(info);
  } catch (error) {
    console.log(error);
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'jeremyjvf16@gmail.com', 
    clientId: '', 
    clientSecret: '', 
    refreshToken: '', 
    accessToken: '' 
  }
});

// Ruta para enviar correo electrónico
router.get('/enviar-correo', (req, res) => {
  // Crea un objeto de correo electrónico
  const mailOptions = {
    from: 'jeremyjvf16@gmail.com',
    to: 'jeredev20@gmail.com',
    subject: 'Automatizado backend Express.js',
    text: 'Probando desde routes backend cesfam',
    html: '<p>Mucho texto porque asi es la vida po hermanito mio</p>'
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado correctamente:', info.response);
      res.send('Correo electrónico enviado correctamente');
    }
  });
});







export default router;
