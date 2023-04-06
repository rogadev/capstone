<template>
  <nav class="bg-base-200 p-4 sticky top-0 z-10">
    <ul class="flex justify-around">
      <NavbarHomeButton />
      <NavbarLink v-for="link in publicLinks" :key="link.to" :to="link.to" :icon="link.icon" :text="link.text"
        :showIf="!user" />
      <NavbarLink v-for="link in privateLinks" :key="link.to" :to="link.to" :icon="link.icon" :text="link.text"
        :showIf="!!user" />
      <NavbarLogoutButton :showIf="user" />
      <ThemeToggler />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const publicLinks = [
  { to: '/#how-it-works', icon: 'fa-solid:question-circle', text: 'How It Works' },
  { to: '/#fees', icon: 'fa-solid:dollar-sign', text: 'Fees' },
  { to: '/#contact', icon: 'fa-solid:phone-square', text: 'Contact Us' },
  { to: '/request-trip', icon: 'fa-solid:route', text: 'Request a Trip' },
  { to: '/login', icon: 'fa-solid:sign-in-alt', text: 'Driver Login' },
];
const privateLinks = [
  { to: '/trips/new', icon: 'fa-solid:plus-circle', text: 'Add Trips' },
  { to: '/trips', icon: 'fa-solid:check-circle', text: 'Confirm Trips' },
  { to: '/drive', icon: 'fa-solid:car', text: 'Drive' },
];
</script>

<style scoped>
.nav-item {
  list-style-type: none;
}
</style>