// This file is responsible for writing all the logic for sending an email
const nodemailer = require('nodemailer');

// Create a transport object, which is provided by nodemailer, which basically has the configuration of a sender sending the email
const transporter = nodemailer.createTransport({
    host: "smtp.gmail",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "sreeja@gmail.com",
      pass: "sreeja",
    },
});

// Write a function to send the email from the sender to the receiver
const sendEmail = async (to, subject, text) => {
    const mailOptions = {   // receiver object options/configuration
        from: "sreeja@gmail.com",
        to: to,
        subject: subject,
        text: text
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("Email sent successfully")
    } catch (err)   {
        console.error("There is an error sending the email:", err)
    }
}

module.exports = {
    sendEmail
}