/**
 * Extracts json from the input string. Parses the json and returns the data.
 * @param content The string containing json data somewhere in the string
 * @returns Parsed data.
 */
export function extractJsonData(content: string) {
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error('No JSON data found in the string');
  const json = content.substring(start, end + 1);
  const data: Trip[] = JSON.parse(json);
  return data;
}