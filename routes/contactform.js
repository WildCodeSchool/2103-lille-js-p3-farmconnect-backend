const express = require('express');

const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

const contactMail = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, message, phoneNumber } = req.body;
  const mailOptions = {
    From: firstName,
    to: process.env.CONTACT_MAIL,
    subject: 'Contact Form Submission',
    html: `<p>Nom : ${lastName}</p>
    <p>Prénom : ${firstName}</p>
    <p>Téléphone : ${phoneNumber}</p>
    <p>Email : ${email}</p>
    <p>Message : ${message}</p>
    `,
  };

  contactMail.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      res.json({ status: 'Error sending the message...' });
    } else {
      res.json({ status: 'Message sent !' });
    }
  });
});

module.exports = router;
