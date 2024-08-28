import type { PageLoad } from '../$types';
import { requireAuth } from '$lib/auth';

export const load: PageLoad = async (event) => {
	requireAuth(event);
	return {};
};
