import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable in production

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();

	try {
		// Find the user
		const user = await prisma.user.findUnique({
			where: { username }
		});

		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		// Check password
		const passwordMatch = await bcrypt.compare(password, user.passwordHash);

		if (!passwordMatch) {
			return json({ error: 'Invalid password' }, { status: 401 });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

		return json({ message: 'Login successful', token }, { status: 200 });
	} catch (error) {
		console.error('Login error:', error);
		return json({ error: 'An error occurred during login' }, { status: 500 });
	}
};
