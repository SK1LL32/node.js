const nodemailer = require('nodemailer');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require("../../config/config");

module.exports = {
  sendEmail: (userEmail) => {
    const transporter = nodemailer.createTransport({
      service: 'email',
      auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
      }
    })

    return transporter.sendMail({
      from: 'no replay',
      to: userEmail,
      subject: 'ua',
      html: `<h1>Ky</h1>`
    })
  }
};
