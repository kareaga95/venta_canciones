import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verifica tu cuenta",
        html: `
            <h1>Verifica tu cuenta</h1>
            <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
        `,
    });
};
