const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
<
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Confirmación de recepción de mensaje',
            text: message,
            html: `<p>${message}</p>`
        });

        res.status(200).send('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});