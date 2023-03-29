export default defineEventHandler(async (event) => {
  const id = await readBody(event);
  if (!id) return sendError(event, 'Client Error: No data was provided.', DEBUG_IN_DEV);
  console.log('Deleting Trip:\n', id);
  //
});