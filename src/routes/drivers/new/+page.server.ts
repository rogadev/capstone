import type { Actions } from '../$types';
import supabase from '$lib/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z, type ZodError } from 'zod';

const driverInviteSchema = z.object({
  email: z.string().min(1, { message: 'Email required to invite a new driver.' }).max(64, { message: 'Maximum email address length is 64 characters.' }).email({ message: 'Please enter a valid email address.' }),
  name: z.string().min(1, { message: 'Name required to invite a new driver.' }).max(64).trim(),
  terms: z.enum(['on'], { required_error: 'You must agree to the terms and privacy policy to invite a new user to join the organization.' })
});

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    let errors = null;
    try {
      const result = driverInviteSchema.parse(formData);
      try {
        const { data } = await supabase.auth.admin.inviteUserByEmail(result.email);
        console.log('user from invite', data);
        const { data: { users } } = await supabase.auth.admin.listUsers();
        const user = users.find(user => user.email === result.email);
        console.log('found user', user);
      } catch (e) {
        console.error("error", e);
      }
    } catch (error: ZodError) {
      errors = error.flatten().fieldErrors;
    }
    return {
      data: formData,
      errors
    };
  }
};