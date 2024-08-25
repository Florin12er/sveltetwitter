import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable in production

export const POST: RequestHandler = async ({ request }) => {
	const { username, email, password } = await request.json();

	try {
		// Check if user already exists
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }]
			}
		});

		if (existingUser) {
			return json({ error: 'Username or email already exists' }, { status: 400 });
		}

		// Hash the password
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		// Create the user
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				passwordHash
			}
		});

		// Generate JWT token
		const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

		return json({ message: 'User registered successfully', token }, { status: 201 });
	} catch (error) {
		console.error('Registration error:', error);
		return json({ error: 'An error occurred during registration' }, { status: 500 });
	}
};
