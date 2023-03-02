import type { RequestHandler } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const POST: RequestHandler = async ({ request }) => {
  // Initial Validation
  const form = Object.fromEntries(await request.formData());
  const { username, password } = form;
  if (!username || !password) {
    return {
      status: 400,
    };
  }
  // Authenticate User
  try {
    const authenticateUser = await auth.validateKeyPassword(
      "username",
      username,
      password
    );
    console.log("result of auth.validateKeyPassword: ", authenticateUser);
    return {
      status: 302,
      headers: {
        "set-cookie": createUser.cookies,
        location: "/",
      },
    };
  } catch (e) {
    const error = e as Error;
    if (
      error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" ||
      error.message === "AUTH_INVALID_PASSWORD"
    ) {
      return {
        status: 400,
        body: JSON.stringify({
          error: "Incorrect email or password.",
        }),
      };
    }
    // database connection error
    return {
      status: 500,
      body: JSON.stringify({
        error: "Unknown error.",
      }),
    };
  }

};