import supabase from '$lib/db';
import { z, ZodError } from 'zod';
import { generateLogTimestamp } from '$lib/db/utils';

// SCHEMA
const organizationIdSchema = z.string().uuid();

// SCHEMA TYPE
export type OrganizationId = z.infer<typeof organizationIdSchema>;

// SCHEMA VALIDATION
const schemaValidation = (organization_id: string) => {
  try {
    organizationIdSchema.parse(organization_id);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(`ERROR: Error deleting organization. ${generateLogTimestamp()}`);
      for (const issue of error.issues) {
        console.error(issue);
      }
      return { success: false, error: error.issues };
    }
    return { success: false, error };
  }
  return { success: true, error: null };
};

// TODO - This will only work if we have deleted all users_organizations records for this organization. At some point, if we start using this function, we will need to add a check to make sure that there are no users_organizations records for this organization before we delete it.

// OPERATION (DELETE ORGANIZATION)
export const deleteOrganization = async (organization_id: string) => {
  // SCHEMA VALIDATION
  let { error, success } = schemaValidation(organization_id);
  if (!success) return { error, success };
  // DELETE ORGANIZATION
  try {
    const { error: e } = await supabase
      .from('organizations')
      .delete()
      .eq('id', organization_id);
    error = e;
  } catch (e) {
    console.error(`ERROR: Error deleting organization. ${generateLogTimestamp()}`);
    console.info(`Organization ID: ${organization_id}`);
    console.info(`Error: ${e}`);
    success = false;
    return { error, success };
  }
  if (error) {
    console.error(`ERROR: Error deleting organization. ${generateLogTimestamp()}`);
    console.info(`Organization ID: ${organization_id}`);
    console.info(`Error: ${error}`);
    success = false;
  }
  return { error, success };
};