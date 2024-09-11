import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;

    try {
        const tweet = await prisma.tweet.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                },
                likes: { select: { id: true } },
                retweets: { select: { id: true } },
                responses: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                profilePicture: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10 // Limit to 10 responses
                }
            }
        });

        if (!tweet) {
            return json({ error: 'Tweet not found' }, { status: 404 });
        }

        const formattedTweet = {
            id: tweet.id,
            content: tweet.content,
            createdAt: tweet.createdAt.toISOString(),
            author: {
                username: tweet.author.username,
                profilePicture: tweet.author.profilePicture
            },
            likes: tweet.likes.length,
            retweets: tweet.retweets.length,
            responses: tweet.responses.map((response) => ({
                id: response.id,
                content: response.content,
                createdAt: response.createdAt.toISOString(),
                author: {
                    username: response.user.username,
                    profilePicture: response.user.profilePicture
                }
            }))
        };

        return json(formattedTweet);
    } catch (error) {
        console.error('Error fetching tweet:', error);
        return json({ error: 'An error occurred while fetching the tweet' }, { status: 500 });
    }
};
