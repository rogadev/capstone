import mapboxgl from 'mapbox-gl';
<template>
  <div ref="mapEl" class="h-96 w-full rounded-md mt-2"></div>
</template>

<script lang="ts" setup>
const { $mapboxgl } = useNuxtApp();
const { darkMode } = useThemeStore();
const mapStyle = computed(() => darkMode ? 'mapbox://styles/ryanroga/cl91jfcnw001215l2vt71oibq' : 'mapbox://styles/ryanroga/cla4jnruj000s15ruek5x1j0q');
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css'
    }
  ],
});

const props = defineProps({
  origin: {
    type: Object as PropType<{ lat: number; lon: number; }>,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
});
const mapEl = ref<HTMLElement>();

let map: any;
let marker: any;
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
    // TODO remove after testing
    console.log(lat, lon);

    map = new $mapboxgl.Map({
      container: mapEl.value,
      style: mapStyle.value,
      center: [lon, lat],
      zoom: 14
    });

    marker = new $mapboxgl.Marker()
      .setLngLat([lon, lat])
      .addTo(map);

  } catch (error) {
    console.error(error);
  }

});
onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>
