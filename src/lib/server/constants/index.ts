export const PW_MIN_LENGTH = 12;
export const PW_MAX_LENGTH = 64;
export const PW_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);