export const generateLogTimestamp = () => Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'medium' }).format(new Date());