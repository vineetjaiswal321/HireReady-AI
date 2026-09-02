import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const sendEmail = async ({ to, subject, text, html }) => {
    await transporter.sendMail({
        from: `"HireReady-AI" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
        html,
    });
};

export default sendEmail;