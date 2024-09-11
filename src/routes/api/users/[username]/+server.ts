import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: params.username },
            include: {
                followers: true,
                following: true
            }
        });

        if (!user) {
            return json({ error: 'User not found' }, { status: 404 });
        }

        return json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return json({ error: 'An error occurred while fetching the user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
