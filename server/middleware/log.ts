const { log } = console;

export default defineEventHandler((event) => {
  log(Intl.DateTimeFormat('us-en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date()) + ' ' + event.node.req.method + ' ' + event.node.req.url);
});
