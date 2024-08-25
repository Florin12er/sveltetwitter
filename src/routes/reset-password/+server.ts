import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
	const { email, resetCode, newPassword } = await request.json();

	try {
		// Find the user
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (
			!user ||
			user.resetCode !== resetCode ||
			!user.resetCodeExpiry ||
			user.resetCodeExpiry < new Date()
		) {
			return json({ error: 'Invalid or expired reset code' }, { status: 400 });
		}

		// Hash the new password
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(newPassword, saltRounds);

		// Update user's password and clear reset code
		await prisma.user.update({
			where: { id: user.id },
			data: {
				passwordHash,
				resetCode: null,
				resetCodeExpiry: null
			}
		});

		return json({ message: 'Password has been reset successfully' }, { status: 200 });
	} catch (error) {
		console.error('Reset password error:', error);
		return json({ error: 'An error occurred during password reset' }, { status: 500 });
	}
};
