<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// TAB CONTROL
const currentTab = ref(1);
const tabs = [
  'Approve Requests',
  'Scheduling',
  'Account Info',
];

// ACCOUNT DATA
const loadingAccountData = ref(true);
loadingAccountData.value = true;
const userData = ref(props.user.user_metadata);
if (userData.value === null) console.warn('Attempted to get user data but failed.');
loadingAccountData.value = false;
</script>

<template>
  <div class="w-full tabs tabs-boxed">
    <button v-for="(tab, index) in tabs" @click="() => currentTab = index + 1" class="tab"
      :class="currentTab === index + 1 && 'tab-active'">{{ tab }}</button>
  </div>
  <div class="w-full mx-8 my-4">
    <div v-if="currentTab === 1">Requests</div>
    <div v-else-if="currentTab === 2">Scheduling</div>
    <Account :userData="userData" v-else-if="currentTab === 3" />
  </div>
</template>