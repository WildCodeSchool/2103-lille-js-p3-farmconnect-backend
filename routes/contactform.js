const express = require('express');

const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

const contactMail = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    secure: true,
    user: process.env.CONTACT_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    rejectUnauthorized: false,
  },
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, message, phoneNumber } = req.body;
  const mail = {
    from: 'FarmConnect',
    to: process.env.CONTACT_EMAIL,
    subject: 'Contact Form Submission',
    html: `<p>Nom : ${lastName}</p>
    <p>Prénom : ${firstName}</p>
    <p>Téléphone : ${phoneNumber}</p>
    <p>Email : ${email}</p>
    <p>Message : ${message}</p>
    `,
  };

  contactMail.sendMail(mail, (err) => {
    if (err) {
      res.json({ status: 'Error sending the message...' });
    } else {
      res.json({ status: 'Message sent !' });
    }
  });
});

module.exports = router;
