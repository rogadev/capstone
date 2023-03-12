import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoadEvent } from '@sveltejs/kit';

export const load: ServerLoadEvent = handleServerSession(async ({ locals }: LayoutServerLoadEvent) => {
  const { user } = await locals.validateUser();
  return {
    user,
  };
});
