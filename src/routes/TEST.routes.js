import { Router } from "express";
import { pool } from "../db.js";
import twilio from "twilio";
import nodemailer from "nodemailer";

/* const accountSid = ""; 
const authToken = ""; 
const client = twilio(accountSid, authToken);  */

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
