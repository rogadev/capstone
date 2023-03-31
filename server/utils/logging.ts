const { DEV } = useRuntimeConfig();
const DEBUG_IN_DEV = DEV.toLowerCase() === 'true';

export function errorLog(e: Error, filename?: string) {
  const { warn, error, info } = console;
  warn('Error in server/api/maps/stop.ts');
  if (IN_DEV && filename) info(filename);
  error(e);
}

export function info(message: any) {
  if (DEBUG_IN_DEV) console.info(message);
};

export function log(message: any) {
  if (DEBUG_IN_DEV) console.log(message);
};