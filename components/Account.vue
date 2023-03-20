<script setup lang="ts">
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});
const email = ref(props.userData.email);
const name = ref(props.userData.name);
const website = ref(props.userData.website);
const picture = ref(props.userData.picture);
</script>

<template>
  <div class="prose">
    <h1>Account Info</h1>
    <div class="grid grid-flow-col gap-4">
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
    <div class="flex flex-col items-center">
      <SignOutButton />
    </div>
  </div>
</template>