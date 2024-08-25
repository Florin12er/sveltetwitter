import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type User = {
	id: string;
	username: string;
};

const storedToken = browser ? localStorage.getItem('token') : null;
const storedUser = browser ? JSON.parse(localStorage.getItem('user') || 'null') : null;

export const token = writable<string | null>(storedToken);
export const user = writable<User | null>(storedUser);

if (browser) {
	token.subscribe((value) => {
		if (value) {
			localStorage.setItem('token', value);
		} else {
			localStorage.removeItem('token');
		}
	});

	user.subscribe((value) => {
		if (value) {
			localStorage.setItem('user', JSON.stringify(value));
		} else {
			localStorage.removeItem('user');
		}
	});
}

export function login(newToken: string, userData: User) {
	token.set(newToken);
	user.set(userData);
}

export function logout() {
	token.set(null);
	user.set(null);
}
