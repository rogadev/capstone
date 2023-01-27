import { SECRET_ENV_MODE } from "$env/static/private";

const mode = SECRET_ENV_MODE !== 'production';
export default mode;