import { auth } from '$lib/server/auth';
import { fail, type Actions } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { PageServerLoad } from './$types';
import { dev } from "$app/environment";
import { z } from 'zod';

export const load: PageServerLoad = async ({ locals }) => {
  // If we're in production, redirect to login
  if (!dev) throw redirect(302, "/login");

  // If the user is already logged in, redirect to the dashboard
  const session = await locals.validate();
  if (session) throw redirect(302, "/dashboard");
};

const emailRegistrationSchema = z.object({
  email: z.string().email().min(3).max(100),
  password: z.string().min(12).max(64),
  passwordConfirm: z.string().min(12).max(64),
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
    console.log(errors);
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