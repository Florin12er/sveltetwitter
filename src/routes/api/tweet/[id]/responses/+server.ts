import { json } from '@sveltejs/kit';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import jwt from 'jsonwebtoken';

export const GET: RequestHandler = async ({ params, url }) => {
    const { id } = params;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    try {
        const responses = await prisma.response.findMany({
            where: { tweetId: id },
            include: {
                user: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset
        });

        const formattedResponses = responses.map((response) => ({
            id: response.id,
            content: response.content,
            createdAt: response.createdAt,
            author: {
                username: response.user.username,
                profilePicture: response.user.profilePicture
            }
        }));

        return json(formattedResponses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const { content } = await request.json();

        if (!content || content.trim().length === 0) {
            return json({ error: 'Response content cannot be empty' }, { status: 400 });
        }

        const newResponse = await prisma.response.create({
            data: {
                content,
                userId: decoded.userId,
                tweetId: params.id
            },
            include: {
                user: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                }
            }
        });

        return json(
            {
                id: newResponse.id,
                content: newResponse.content,
                createdAt: newResponse.createdAt,
                author: {
                    username: newResponse.user.username,
                    profilePicture: newResponse.user.profilePicture
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Response creation error:', error);
        return json({ error: 'An error occurred while creating the response' }, { status: 500 });
    }
};
