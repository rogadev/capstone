import * as env from 'dotenv';
env.config();

const mode = process.env.SECRET_ENV_MODE !== 'production';
export default mode;