<script setup lang="ts">
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-flow-col gap-4 prose">
    <div>
      <h3>Avatar</h3>
      <img :src="picture" />
    </div>
    <div>
      <h3>Email</h3>
      <p>{{ email }}</p>
    </div>
    <div>
      <h3>Username</h3>
      <p>{{ name }}</p>
    </div>
    <div v-if="website">
      <h3>Website</h3>
      <p>{{ website }}</p>
    </div>
  </div>
</template>