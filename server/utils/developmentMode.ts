const { DEV } = useRuntimeConfig();
const IN_DEV = !!DEV && DEV.toLowerCase() === 'true';

export default IN_DEV;