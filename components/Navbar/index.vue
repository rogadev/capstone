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
  { to: '/#how-it-works', icon: 'ic:baseline-contact-support', text: 'How It Works' },
  { to: '/#fees', icon: 'ic:baseline-attach-money', text: 'Fees' },
  { to: '/#contact', icon: 'ic:baseline-contact-support', text: 'Contact Us' },
  { to: '/request-trip', icon: 'ic:baseline-directions-car', text: 'Request a Trip' },
  { to: '/login', icon: 'ic:baseline-login', text: 'Driver Login' },
];
const privateLinks = [
  { to: '/trips', icon: 'fa6-solid:route', text: 'Trips' },
  // { to: '/requests', icon: 'ic:baseline-contact-support', text: 'Requests' },
  // { to: '/scheduling', icon: 'ic:baseline-calendar-today', text: 'Scheduling' },
  { to: '/account', icon: 'ic:baseline-account-circle', text: 'Account' },
  { to: '/drive', icon: 'ic:round-drive-eta', text: 'Drive' },
];
</script>

<style scoped>
.nav-item {
  list-style-type: none;
}
</style>