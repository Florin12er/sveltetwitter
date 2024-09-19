import { redirect } from '@sveltejs/kit';
import type { LoadEvent } from '@sveltejs/kit';
import { token } from '$lib/stores/authStore';
import { get } from 'svelte/store';

export function requireAuth(event: LoadEvent) {
	const currentToken = get(token);

	if (!currentToken) {
		throw redirect(307, '/login');
	}
	localStorage.removeItem('token');
}
export function redirectIfAuthenticated(event: LoadEvent) {
	const currentToken = get(token);

	if (currentToken) {
		throw redirect(307, '/');
	}
}
