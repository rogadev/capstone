export default function useGeoLocation() {
  const lat = ref(null);
  const lon = ref(null);

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        lat.value = position.coords.latitude;
        lon.value = position.coords.longitude;
      }, error => {
        console.error(error.message);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  onMounted(() => {
    getGeoLocation();
  });

  return {
    lat,
    lon,
    getGeoLocation
  };
}
