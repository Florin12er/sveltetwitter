import type { PageLoad } from './$types';
import { redirectIfAuthenticated } from '$lib/auth';

export const load: PageLoad = async (event) => {
	redirectIfAuthenticated(event);
	return {};
};
