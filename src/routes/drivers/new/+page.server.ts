import type { Actions } from '../$types';
import supabaseClient from '$lib/db';
import { redirect } from '@sveltejs/kit';

import { z } from 'zod';

const driverInviteSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(64).trim(),
  terms: z.enum(['on'], { message: 'You must agree to the terms.' })
});

type ValidDriverInvite = z.infer<typeof driverInviteSchema>;

export const actions: Actions = {
  default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());

    try {
      const result = driverInviteSchema.parse(data);
      console.log('Success.');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
};