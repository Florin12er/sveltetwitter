import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	try {
		const users = await prisma.user.findMany({
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

		return json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		return json({ error: 'An error occurred while fetching users' }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};
