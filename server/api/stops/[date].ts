import supabase from "~/server/db/supabase";

export default defineEventHandler(async (event) => {
  const date = event.context.params.date;
  // VALIDATION
  try {
    validateDate(date);
  } catch (e) {
    console.log('An error occurred validating date', e.message);
    return sendError(event, e.message);
  }
  // FETCH DATA
  try {
    const { data, error } = await supabase.from('stops').select().eq('date', date);
    if (error) throw error;
    return data;
  } catch (e) {
    console.log('An error occurred getting stops', e.message);
    return sendError(event, e.message);
  }
});

/**
 * Verifies and validates the date is what we expect to find in our database.
 */
function validateDate(date: string) {
  // Verify
  if (!date) {
    throw new Error('Date is required. Please include a date in the request body.');
  }
  // Validate 2023-03-29
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new Error('Date must be in the format YYYY-MM-DD.');
  }
}