import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

export const sendResetEmail = async (to: string, resetCode: string) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject: 'Password Reset Code',
		html: `
      <p>You requested a password reset. Here is your reset code:</p>
      <h2>${resetCode}</h2>
      <p>Enter this code on the password reset page to create a new password.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
	};

	await transporter.sendMail(mailOptions);
};
