import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoadEvent } from '@sveltejs/kit';
import { getRole } from '$lib/server/utils/getUserRole';
import { dev } from '$app/environment';

export const load: ServerLoadEvent = handleServerSession(async ({ locals }: LayoutServerLoadEvent) => {
  const { session, user } = await locals.validateUser();
  locals.session = session;
  if (session && user) {
    const role = await getRole(user);
    user.role = role;
  }
  locals.user = user;
  if (dev) {
    console.log("User", user);
    console.log("Session", session);
  }
  return {
    user,
  };
});