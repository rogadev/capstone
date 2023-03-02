import { handleServerSession } from '@lucia-auth/sveltekit';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load: ServerLoadEvent = handleServerSession();
