<template>
  <div class="late-indicator">
    <p>Arriving Late</p>
  </div>
</template>

<style scoped>
/* late-indicator should slowly flash red and dark red */
.late-indicator {
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

.late-indicator p {
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>