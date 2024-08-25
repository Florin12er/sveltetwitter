import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import crypto from 'crypto';
import { sendResetEmail } from '$lib/email';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	try {
		// Find the user
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			// Don't reveal that the user doesn't exist
			return json(
				{ message: 'If an account with that email exists, we have sent a password reset code.' },
				{ status: 200 }
			);
		}

		// Generate reset code
		const resetCode = crypto.randomInt(100000, 999999).toString();
		const resetCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now

		// Save reset code to user
		await prisma.user.update({
			where: { id: user.id },
			data: {
				resetCode,
				resetCodeExpiry
			}
		});

		// Send reset email
		await sendResetEmail(user.email, resetCode);

		return json(
			{ message: 'If an account with that email exists, we have sent a password reset code.' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Reset request error:', error);
		return json({ error: 'An error occurred during the reset request' }, { status: 500 });
	}
};
