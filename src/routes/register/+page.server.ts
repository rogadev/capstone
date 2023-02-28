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
  email: z.string().email({ message: "Must enter a valid email." }).min(3, { message: "Must enter an email address to register." }).max(100, { message: "Email address is too long." }),
  password: z.string().min(PW_MIN_LENGTH, { message: `Password must be at least ${PW_MIN_LENGTH} characters long.` }).max(PW_MAX_LENGTH, { message: `Password must be no more than ${PW_MAX_LENGTH} characters long.` }).regex(/[a-z]/, { message: "Password must contain at least 1 lower case letter." }).regex(/[A-Z]/, { message: "Password must contain at least 1 upper case letter." }).regex(/\d/, { message: "Password must contain at least 1 number." }).regex(/[@$!.%*?&_-]/, { message: "Password must contain at least 1 special character. (@$!%*?&_-)" }),
  passwordConfirm: z.string().min(1, { message: "Must confirm your password." }).max(PW_MAX_LENGTH + 1),
});
type EmailRegistrationData = z.infer<typeof emailRegistrationSchema>;

const handleEmailRegistration = async (formData: EmailRegistrationData, locals) => {
  console.log('Email registration', formData);
  const result = emailRegistrationSchema.safeParse(formData);
  const passwordsMatch = formData.password === formData.passwordConfirm;
  if (!result.success) {
    const issues = result.error.issues;
    const errors = {
      email: [... new Set(issues.filter((issue) => issue.path[0] === 'email').map((issue) => issue.message))],
      password: [... new Set(issues.filter((issue) => issue.path[0] === 'password').map((issue) => issue.message))],
    };
    errors.passwordConfirm = passwordsMatch ? [] : ['Passwords do not match'];
    return { errors };
  }
  const { email, password } = formData;
  try {
    const user = await auth.createUser({
      key: {
        providerId: 'email',
        providerUserId: email,
        password,
      },
      attributes: {
        email,
      }
    });
    const session = await auth.createSession(user.userId);
    locals.setSession(session);
  } catch (error) {
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
};


export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(
      await request.formData(),
    ) as Record<string, string>;
    await handleEmailRegistration(formData, locals);
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