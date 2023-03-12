import type { UserRole } from '@prisma/client';
import { prismaClient } from '$lib/server/prisma';
import { type RequestHandler, fail } from '@sveltejs/kit';

export const GET = (async ({ locals }) => {
  console.log('GET /api/user/role');
  // AUTHENTICATION
  const { session, user } = await locals.validateUser();
  // AUTHORIZATION
  if (!session || !user) return fail(401, 'Unauthorized');
  // GET USER ROLE
  let role: UserRole;
  try {
    role = await prismaClient.user.findUnique({
      where: {
        username: user.username,
      },
      select: {
        Role: true,
      },
    });
  } catch (e) {
    console.error(e);
    return fail(500, 'Unknown error getting data from database');
  }
  return new Response(JSON.stringify(role));
}) satisfies RequestHandler;