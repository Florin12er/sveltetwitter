import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
    try {
        const tweet = await prisma.tweet.findUnique({
            where: { id: params.id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profilePicture: true
                    }
                }
            }
        });

        if (!tweet) {
            return json({ error: 'Tweet not found' }, { status: 404 });
        }

        return json(tweet);
    } catch (error) {
        console.error('Error fetching tweet:', error);
        return json({ error: 'An error occurred while fetching the tweet' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
