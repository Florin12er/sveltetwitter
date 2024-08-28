// src/routes/api/tweets/+server.ts

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

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const { content } = await request.json();

        if (!content || content.trim().length === 0) {
            return json({ error: 'Tweet content cannot be empty' }, { status: 400 });
        }

        const newTweet = await prisma.tweet.create({
            data: {
                content,
                authorId: decoded.userId
            },
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

        return json(newTweet, { status: 201 });
    } catch (error) {
        console.error('Tweet creation error:', error);
        return json({ error: 'An error occurred while creating the tweet' }, { status: 500 });
    }
};
export const GET: RequestHandler = async ({ url }) => {
    try {
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        const tweets = await prisma.tweet.findMany({
            take: limit,
            skip: skip,
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        retweets: true
                    }
                }
            }
        });

        const totalTweets = await prisma.tweet.count();

        const formattedTweets = tweets.map((tweet) => ({
            id: tweet.id,
            content: tweet.content,
            username: tweet.author.username,
            profilePicture: tweet.author.profilePicture,
            likes: tweet._count.likes,
            retweets: tweet._count.retweets,
            timestamp: tweet.createdAt.toISOString()
        }));

        return json({
            tweets: formattedTweets,
            totalPages: Math.ceil(totalTweets / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return json({ error: 'An error occurred while fetching tweets' }, { status: 500 });
    }
};
