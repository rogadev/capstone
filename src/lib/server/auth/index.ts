import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prismaClient } from "$lib/server/prisma";

// Transform user data takes in user data and returns what we want the user data to look like when we ask based on the session id or whatever we used to get it. In some cases that's fine, but in other cases we might want to transform it. For example, we might want to return the user's full name instead of their first and last name. We can do that here.

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  transformUserData: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      role: userData.Role,
    };
  }
});

export type Auth = typeof auth;
