import type { RequestHandler } from './$types';
import { googleAuth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const provider = url.searchParams.get('provider');
  if (provider === 'google') {
    const [url, state] = googleAuth.getAuthorizationUrl();
    cookies.set('oauth_state', state, {
      path: '/',
      maxAge: 60 * 60
    });
    throw redirect(302, url);
  }
  return new Response(null, {
    status: 400
  });
};