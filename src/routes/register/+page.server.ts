import { auth } from '$lib/server/auth';
import { fail, type Actions } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { PageServerLoad } from './$types';
import { dev } from "$app/environment";
import { z } from 'zod';

const MIN_PW_LENGTH = 12;
const MAX_PW_LENGTH = 64;
const PW_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

export const load: PageServerLoad = async ({ locals }) => {
  // If we're in production, redirect to login
  if (!dev) throw redirect(302, "/login");

  // If the user is already logged in, redirect to the dashboard
  const session = await locals.validate();
  if (session) throw redirect(302, "/dashboard");
};

const emailRegistrationSchema = z.object({
  email: z.string().email({ message: "Must enter a valid email." }).min(3, { message: "Must enter an email address to register." }).max(100, { message: "Email address is too long." }),
  password: z.string().min(MIN_PW_LENGTH, { message: `Password must be at least ${MIN_PW_LENGTH} characters long.` }).max(MAX_PW_LENGTH, { message: `Password must be no more than ${MAX_PW_LENGTH} characters long.` }).regex(PW_REGEX, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)." }),
  passwordConfirm: z.string().min(1, { message: "Must confirm your password." }).max(MAX_PW_LENGTH + 1),
});
type EmailRegistrationData = z.infer<typeof emailRegistrationSchema>;

const handleEmailRegistration = async (formData: EmailRegistrationData) => {
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
  const username = formData.email;
  const password = formData.password;
  const passwordConfirm = formData.passwordConfirm;
  console.log(username, password, passwordConfirm);
};

const handleProviderRegistration = async (formData: Record<string, string>) => {
  console.log('Provider registration', formData);
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(
      await request.formData(),
    ) as Record<string, string>;

    if (formData.provider) await handleProviderRegistration(formData);
    else await handleEmailRegistration(formData);
  }
};