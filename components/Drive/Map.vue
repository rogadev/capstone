import mapboxgl from 'mapbox-gl';
<template>
  <div ref="mapEl" class="h-96 w-full rounded-md mt-2" style="pointer-events: none;"></div>
</template>

<script lang="ts" setup>
const { $mapboxgl } = useNuxtApp();

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css'
    }
  ],
});

const props = defineProps({
  destination: {
    type: String,
    required: true,
  },
});

const mapEl = ref<HTMLElement>();

onMounted(async () => {
  try {
    // Responds with { lon, lat } if successful
    const response = await fetch('/api/maps/lonlat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        destination: props.destination,
      })
    });

    const { lat, lon } = await response.json() as { lat: number; lon: number; };

    const map = new $mapboxgl.Map({
      container: mapEl.value,
      style: 'mapbox://styles/ryanroga/cla4jnruj000s15ruek5x1j0q',
      center: [lon, lat],
      zoom: 14
    });

    new $mapboxgl.Marker()
      .setLngLat([lon, lat])
      .addTo(map);

  } catch (error) {
    console.error(error);
  }

});
</script>
