export function errorLog(e: Error, filename?: string) {
  console.warn('Error in server/api/maps/stop.ts');
  if (filename) console.info(filename);
  console.error(e);
}

export function info(message: string) {
  console.info(message);
};

export function log(message: string) {
  console.log(message);
};