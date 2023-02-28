import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prismaClient } from "$lib/server/prisma";

import google from '@lucia-auth/oauth/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

// Transform user data takes in user data and returns what we want the user data to look like when we ask based on the session id or whatever we used to get it. In some cases that's fine, but in other cases we might want to transform it. For example, we might want to return the user's full name instead of their first and last name. We can do that here.

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  transformUserData: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      name: userData.fullName,
    };
  }
});

export const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:5173/api/oauth/google",
});

export type Auth = typeof auth;
