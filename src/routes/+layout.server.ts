import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoadEvent } from '@sveltejs/kit';

export const load: ServerLoadEvent = handleServerSession(async ({ locals }: LayoutServerLoadEvent) => {
  const { user } = await locals.validateUser();
  // TODO See issues. Redirect driver users to `/app/` instead of admin homepage.
  return {
    user,
  };
});
