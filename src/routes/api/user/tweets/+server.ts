// src/routes/api/user/tweets/+server.ts

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
		const tweets = await prisma.tweet.findMany({
			where: { authorId: decoded.userId },
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				content: true,
				createdAt: true,
				author: {
					select: {
						username: true
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

		const formattedTweets = tweets.map((tweet) => ({
			id: tweet.id,
			username: tweet.author.username,
			content: tweet.content,
			likes: tweet._count.likes,
			retweets: tweet._count.retweets,
			timestamp: tweet.createdAt.toISOString()
		}));

		return json(formattedTweets);
	} catch (error) {
		console.error('Token verification error:', error);
		return json({ error: 'Invalid token' }, { status: 401 });
	}
};
