// src/routes/+layout.ts
import type { LayoutLoad } from './$types';
import { token, updateAuthStatus } from '$lib/stores/authStore';
import { get } from 'svelte/store';

export const load: LayoutLoad = async () => {
    const currentToken = get(token);
    const authenticated = !!currentToken;
    updateAuthStatus(authenticated);

    return {
        authenticated
    };
};
