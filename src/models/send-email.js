const nodemailer = require('nodemailer');

async function sendEmail(recipient, subject, content) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'spreaditnoreplyservices@gmail.com',
      pass: 'spreadit123'
    }
  });

  const mailOptions = {
    from: 'spreaditnoreplyservices@gmail.com',
    to: recipient,
    subject: subject,
    text: content
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
