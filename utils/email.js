const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "atripatel01@gmail.com",
        pass: "yioq vghw lmma ohak",
    },
});


const sendStatusEmail = async (to, name, status) => {
    const subject = `Your Application has been ${status}`;
    const message = `
      <p>Hi ${name},</p>
      <p>Your application has been <strong>${status}</strong>.</p>
      <p>Thank you for applying!</p>
    `;

    const mailOptions = {
        from: "Aunit",
        to,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
};

const sendOTPEmail = async (to, otp , name) => {
    const subject = "Login OTP";
    const message = `
      <p>Hi, ${name}</p>
      <p>Your OTP for resetting your password is:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 5 minutes.</p>
    `;

    const mailOptions = {
        from: "Aunit",
        to,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendStatusEmail, sendOTPEmail };