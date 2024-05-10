const nodemailer = require("nodemailer");

async function sendEmail(recipient, subject, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: "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",
    },
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
