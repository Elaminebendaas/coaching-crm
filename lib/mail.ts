import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetlink = `${process.env.FRONTEND_URL}/auth/new-password?token=${token}`;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click here to reset your password:</p> <a href="${resetlink}">Click me</a>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmlink = `${process.env.FRONTEND_URL}/auth/new-verification?token=${token}`;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click here to verify your email:</p> <a href="${confirmlink}">Click me</a>`,
  });
};
