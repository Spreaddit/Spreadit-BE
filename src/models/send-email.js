const nodemailer = require('nodemailer');

async function sendEmail(recipient, subject, content) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: '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', 
    },
  });

  const mailOptions = {
    from: 'spreaditnoreplyservices@gmail.com',
    to: recipient,
    subject: subject,
    text: content,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
