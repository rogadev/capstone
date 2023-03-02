import { auth } from '$lib/server/auth';
import { fail, type Actions } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { PageServerLoad } from './$types';
import { dev } from "$app/environment";
import { z } from 'zod';
import { PW_MIN_LENGTH, PW_MAX_LENGTH } from '$lib/server/constants';

const emailRegistrationSchema = z.object({
  username: z
    .string({ required_error: "Must enter an email address to register." })
    .email({ message: "Must enter a valid email." })
    .min(3, { message: "Must enter an email address to register." })
    .max(100, { message: "Email address must be no more than 100 characters long." }),
  password: z
    .string({ required_error: "Must enter a password to register." })
    .min(PW_MIN_LENGTH, { message: `Password must be at least ${PW_MIN_LENGTH} characters long.` })
    .max(PW_MAX_LENGTH, { message: `Password must be no more than ${PW_MAX_LENGTH} characters long.` })
    .regex(/[a-z]/, { message: "Password must contain at least 1 lower case letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least 1 upper case letter." })
    .regex(/\d/, { message: "Password must contain at least 1 number." })
    .regex(/[@$!.%*?&_-]/, { message: "Password must contain at least 1 special character. (@$!%*?&_-)" }),
  passwordConfirm: z
    .string({ required_error: "Must confirm your password." })
    .min(1, { message: "Must confirm your password." })
    .max(PW_MAX_LENGTH + 1, { message: "Must confirm your password." })
}).superRefine(data => {
  if (data.password !== data.passwordConfirm) {
    return {
      path: ['passwordConfirm'],
      message: "Passwords do not match."
    };
  }
  return null;
});

type EmailRegistrationData = z.infer<typeof emailRegistrationSchema>;

type EmailRegistrationErrors = {
  username?: string[] | undefined;
  password?: string[] | undefined;
  passwordConfirm?: string[] | undefined;
};

const { log } = console;
export const actions: Actions = {
  default: async ({ request, locals }) => {
    log('Default action fired.');
    const formData: EmailRegistrationData = Object
      .fromEntries(await request.formData());
    log('Data received: ', formData);
    const result = emailRegistrationSchema.safeParse(formData);
    const { username } = formData;

    if (!result.success) {
      log('Validation failed:');
      const errors: EmailRegistrationErrors = result.error.flatten().fieldErrors;
      log(errors);
      return { username, errors };
    }

    const { password } = formData;

    try {
      log('Attempting to admin create user...');
      const user = await auth.createUser({
        key: {
          providerId: 'username',
          providerUserId: username,
          password,
        },
        attributes: {
          username,
        }
      });
      log('User created: ', user);
      const session = await auth.createSession(user.userId);
      locals.setSession(session);
    } catch (error) {
      log('Error occurred creating user: ', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        error.message?.includes('username')
      ) {
        return fail(400, {
          message: 'Username already in use'
        });
      }
      if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
        return fail(400, {
          message: 'Username already in use'
        });
      }
      return fail(500, {
        message: 'Unknown error occurred'
      });
    }
  }
};

export const load: PageServerLoad = async ({ locals }) => {
  // If we're in production, redirect to login
  if (!dev) throw redirect(302, "/login");
  // If the user is already logged in, redirect to the dashboard
  const session = await locals.validate();
  if (session) throw redirect(302, "/dashboard");
  return {};
};