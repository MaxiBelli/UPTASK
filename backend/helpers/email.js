import nodemailer from "nodemailer";

export const emailRegistration = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ae544664339319",
      pass: "74e3483fdf0b72",
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
