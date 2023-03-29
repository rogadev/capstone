<template>
  <div>
    <button @click="action" class="btn btn-primary">Action</button>
  </div>
</template>

<script lang="ts" setup>
async function action() {
  const response = await fetch('/api/maps/metrics', {
    method: 'POST',
    body: JSON.stringify({
      origin: "805 Wentworth St, Nanaimo",
      destination: 'viking way, Parksville',
    }),
  });
  const data = await response.json();
  console.log(data);
}
</script>