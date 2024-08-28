export async function createTweet(content: string) {
	const token = localStorage.getItem('token');

	if (!token) {
		throw new Error('No token found');
	}

	const response = await fetch('/api/tweets', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ content })
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Failed to create tweet');
	}

	return await response.json();
}
