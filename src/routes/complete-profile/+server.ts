import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const POST: RequestHandler = async ({ request }) => {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return json({ error: 'No token provided' }, { status: 401 });
	}

	const token = authHeader.split(' ')[1];
	let userId;

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
		userId = decoded.userId;
	} catch {
		return json({ error: 'Invalid token' }, { status: 401 });
	}

	const { fullName, bio, location, website } = await request.json();

	try {
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				fullName,
				bio,
				location,
				website
			}
		});

		return json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 });
	} catch (error) {
		console.error('Profile update error:', error);
		return json({ error: 'An error occurred while updating the profile' }, { status: 500 });
	}
};
