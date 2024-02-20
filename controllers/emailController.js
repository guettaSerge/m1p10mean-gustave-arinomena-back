const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '//',
    pass: '//',
  },
});

router.post('/send-email', (req, res) => {
  const { email, objet, texte } = req.body;

  const mailOptions = {
    from: '//',
    to: email,
    objet,
    texte,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi de l\'email.' });
    } else {
      res.status(200).json({ message: 'Email envoyé avec succès.' });
    }
  });
});

module.exports = router;
