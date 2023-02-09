import supabaseClient from '$lib/db';
import { z, ZodError } from 'zod';

// INPUT SCHEMA
const userIdSchema = z.string().uuid();
type UserId = z.infer<typeof userIdSchema>;

// VALIDATE SCHEMA
const validateSchema = (userId: string) => {
  try {
    userIdSchema.parse(userId);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Error validating user id', error);
      return { data: null, error };
    }
    return { data: null, error };
  }
  return { data: null, error: null };
};

// GET ALL ORGANIZATIONS ASSOCIATED TO THIS USER
export const getUsersOrganizations = async (user_id: UserId) => {
  // VALIDATE SCHEMA
  const { data, error } = validateSchema(user_id);
  if (!data) return { data, error };
  // GET ALL ORGANIZATIONS ASSOCIATED TO THIS USER
  const { data: usersOrganizations, error: usersOrganizationsError } = await supabaseClient
    .from('users_organizations')
    .select('*')
    .eq('user_id', user_id);
  if (usersOrganizationsError) return { data: null, error: usersOrganizationsError };
  console.log('usersOrganizations', usersOrganizations);

  // TODO finish

  return { data, error };
};