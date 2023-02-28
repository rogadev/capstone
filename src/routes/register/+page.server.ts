
import { dev } from '$app/environment';
import { z } from 'zod';
import { supabase } from '$lib/db';
import { PW_MIN_LENGTH, PW_MAX_LENGTH, PW_REGEX } from '$lib/server/constants';
import { redirect } from '@sveltejs/kit';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

const emailRegistrationSchema = z.object({
  email: z.string().email({ message: "Must enter a valid email." }).min(3, { message: "Must enter an email address to register." }).max(100, { message: "Email address is too long." }),
  password: z.string().min(PW_MIN_LENGTH, { message: `Password must be at least ${PW_MIN_LENGTH} characters long.` }).max(PW_MAX_LENGTH, { message: `Password must be no more than ${PW_MAX_LENGTH} characters long.` }).regex(PW_REGEX, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)." }),
  passwordConfirm: z.string().min(1, { message: "Must confirm your password." }).max(PW_MAX_LENGTH + 1),
});
type FormData = z.infer<typeof emailRegistrationSchema>;

type FormErrors = {
  email?: string[],
  password?: string[],
  passwordConfirm?: string[],
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    // ERRORS OBJECT
    const errors: FormErrors = {
      email: [],
      password: [],
      passwordConfirm: [],
    };
    // FORM DATA
    const form = Object.fromEntries(
      await request.formData(),
    ) as Record<string, string>;
    const { email, password, passwordConfirm } = form as FormData;
    // VALIDATE FORM DATA
    const result = emailRegistrationSchema.safeParse(form);
    if (!result.success) {
      const issues = result.error.issues;
      errors.email = [... new Set(issues.filter((issue) => issue.path[0] === 'email').map((issue) => issue.message))];
      errors.password = [... new Set(issues.filter((issue) => issue.path[0] === 'password').map((issue) => issue.message))];
      if (password !== passwordConfirm) {
        errors.passwordConfirm = ['Passwords do not match'];
      }
      return {
        form,
        errors
      };
    }
    // ATTEMPT TO REGISTER USER
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      }
      const session = await supabase.auth.session();
      locals.setSession(session);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        errors.email.push('Email already in use');
        return {
          form,
          errors
        };
      }
      return fail(500, {
        form,
        message: 'Unknown error occurred'
      });
    }
    throw redirect(302, '/register/success');
  }
};

export const load: PageServerLoad = async (event) => {
  // If we're in production, redirect to login
  if (!dev) throw redirect(302, "/login");

  // If the user is already logged in, redirect to the dashboard
  const session = await getServerSession(event);
  if (session) throw redirect(302, "/dashboard");
  return {};
};