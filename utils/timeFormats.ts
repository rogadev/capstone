/**
 * Turn incorrect time string formats into a 24-hour time string (HH:MM)
 * @param stringToFormat like "715", "715am", "715 am", "7 15am", "7 15 am", "7:15", "7:15am", "7:15 am"
 * @returns "07:15"
 */
export const format24HourTimeString = (stringToFormat: string) => {
  // Remove any whitespace
  const cleanedString = stringToFormat.replace(/\s/g, '');
  // Use a regular expression to match the different time formats
  const timeRegex = /^(\d{1,2})(?::?)(\d{2})(am|pm)?$/i;
  const match = timeRegex.exec(cleanedString);
  // No match means its not a valid time
  if (!match) return null;
  // Extract the hour, minute, and am/pm
  let hour = parseInt(match[1]);
  const minute = match[2];
  const isPM = match[3]?.toLowerCase() === 'pm';
  // 24-hour-ify the time
  if (isPM && hour !== 12) hour += 12;
  else if (!isPM && hour === 12) hour = 0;
  // Format and return the time string
  return `${hour.toString().padStart(2, '0')}:${minute}`;
};