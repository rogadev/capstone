import { auth } from '$lib/server/auth';
import { fail, type Actions } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { PageServerLoad, Actions } from './$types';
import { dev } from "$app/environment";
import { z } from 'zod';
import { PW_MIN_LENGTH, PW_MAX_LENGTH } from '$lib/server/constants';

let username = '';
let errors: EmailRegistrationErrors = {
  username: [],
  password: [],
  passwordConfirm: [],
};

export const load: PageServerLoad = async ({ locals }) => {
  if (!dev) throw redirect(302, "/login"); // Protects from admin registrations in production.
  const session = await locals.validate();
  if (session) throw redirect(302, "/atc");
  return {};
};

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
  default: async ({ request }) => {

    log('Default action fired.');
    const formData: EmailRegistrationData = Object
      .fromEntries(await request.formData());

    log('Data received: ', formData);
    const result = emailRegistrationSchema.safeParse(formData);
    username = formData.username;

    if (!result.success) {
      log('Validation failed:');
      errors = result.error.flatten().fieldErrors;
      log(errors);
      return { username, errors };
    }

    const { password } = formData;

    try {
      log('Attempting to admin create user...');
      await auth.createUser({
        key: {
          providerId: 'username',
          providerUserId: username,
          password,
        },
        attributes: {
          username,
        }
      });

    } catch (error) {
      log('Error occurred creating user: ', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        error.message?.includes('username')
      ) {
        errors.username.push('Registration failed. Username already in use.');

      } else if (error instanceof LuciaError && error.message.includes('AUTH_DUPLICATE_KEY_ID')) {
        errors.username.push('Registration failed. Username already in use.');

      } else {
        errors.username.push('Registration failed. Please try again later.');
      }
      console.log('fffff', errors, username);
      return { username, errors };
    }
    throw redirect(302, '/register/success');
  }
};