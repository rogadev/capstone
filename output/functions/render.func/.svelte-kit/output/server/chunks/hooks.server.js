import "./db.js";
import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import { r as redirect, f as fail } from "./index.js";
const getSupabaseSession = async (event) => {
  let session = null;
  try {
    session = await getServerSession(event);
  } catch (e) {
    console.error("Supabase getServerSession Error: ", e);
    fail(500, "Something went wrong");
  }
  return session;
};
const handle = async ({ event, resolve }) => {
  const session = await getSupabaseSession(event);
  const loggedIn = session !== null ? true : false;
  const loggingIn = event.url.pathname.match("/login") ? true : false;
  const intendedPath = event.url.pathname;
  const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/public", "/onboarding"];
  const intendedPathIsPublic = intendedPath === "/" || publicPaths.some((publicPath) => intendedPath.startsWith(publicPath));
  if (loggingIn && loggedIn)
    throw redirect(303, "/dashboard");
  if (!loggedIn && !intendedPathIsPublic)
    throw redirect(303, "/login");
  return await resolve(event);
};
export {
  handle
};
