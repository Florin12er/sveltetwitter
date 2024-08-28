import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const GET: RequestHandler = async ({ request }) => {
	const authHeader = request.headers.get('Authorization');

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return json({ error: 'No token provided' }, { status: 401 });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
			select: {
				id: true,
				username: true,
				email: true,
				fullName: true,
				bio: true,
				location: true,
				website: true,
				profilePicture: true,
				createdAt: true,
				updatedAt: true
			}
		});

		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json(user);
	} catch (error) {
		console.error('Token verification error:', error);
		return json({ error: 'Invalid token' }, { status: 401 });
	}
};
