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
const editingMode = ref(false);
</script>

<template>
  <div>
    <div class="prose">
      <h1>Account Info</h1>
    </div>
    <EditAccountDetails :cancel="() => editingMode = !editingMode" v-if="editingMode" :email="email" :name="name"
      :website="website" :picture="picture" />
    <DisplayAccountDetails v-else :email="email" :name="name" :website="website" :picture="picture" />
    <div v-if="!editingMode" class="flex flex-row gap-4 items-center justify-center">
      <div class="p-4">
        <button class="btn btn-primary btn-wide" @click="() => editingMode = !editingMode">{{ editingMode ? 'Cancel' :
          'Edit'
        }}</button>
      </div>
      <SignOutButton />
    </div>
  </div>
</template>