import mapboxgl from 'mapbox-gl';

export default defineNuxtPlugin(() => {
  const { MAPBOX_ACCESS_TOKEN } = useRuntimeConfig();
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  return {
    provide: {
      mapboxgl: mapboxgl
    }
  };
});
