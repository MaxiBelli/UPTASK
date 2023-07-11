import nodemailer from "nodemailer";

export const emailRegistration = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information
  const info = await transport.sendMail({
    from: '"UpTask - Project Manager" <accounts@uptask.com>',
    to: email,
    subject: "UpTask - Verify Your Account",
    text: "Verify your account on UpTask",
    html: `<p>Hello ${name},</p>
  <p>Please verify your account on UpTask by clicking the following link: 

  <a href="${process.env.FRONTEND_URL}/confirm/${token}">Verify Account</a>
  
  <p>If you did not create this account, you can ignore this message.</p>
  `,
  });
};

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information
  const info = await transport.sendMail({
    from: '"UpTask - Project Manager" <accounts@uptask.com>',
    to: email,
    subject: "UpTask - Reset Your Password",
    text: "Reset your password on UpTask",
    html: `<p>Hello ${name},</p>

    <p>You have requested to reset your password. Click the following link to generate a new password: 

    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset Password</a>
    
    <p>If you did not request this email, you can ignore this message.</p>
    `,
  });
};
