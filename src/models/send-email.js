const nodemailer = require("nodemailer");
const config = require("../configuration");

async function sendEmail(recipient, subject, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: config.emailServicePath,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: "spreaditnoreplyservices@gmail.com",
    to: recipient,
    subject: subject,
    text: content,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
