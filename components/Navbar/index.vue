<template>
  <nav class="bg-base-200 p-4 sticky top-0 z-10">
    <ul class="flex justify-around">
      <NavbarHomeButton />
      <NavbarLink to="/#how-it-works" icon="ic:baseline-contact-support" text="How It Works" :showIf="!user" />
      <NavbarLink to="/#fees" icon="ic:baseline-attach-money" text="Fees" :showIf="!user" />
      <NavbarLink to="/#contact" icon="ic:baseline-contact-support" text="Contact Us" :showIf="!user" />
      <NavbarLink to="/request-trip" icon="ic:baseline-directions-car" text="Request a Trip" :showIf="!user" />
      <NavbarLink to="/login" icon="ic:baseline-login" text="Driver Login" :showIf="!user" />
      <NavbarLink to="/dashboard" icon="ic:baseline-dashboard" text="Dashboard" :showIf="!!user" />
      <NavbarLink to="/trips" icon="ic:baseline-directions-car" text="Trips" :showIf="!!user" />
      <NavbarLink to="/requests" icon="ic:baseline-contact-support" text="Requests" :showIf="!!user" />
      <NavbarLink to="/scheduling" icon="ic:baseline-calendar-today" text="Scheduling" :showIf="!!user" />
      <NavbarLink to="/account" icon="ic:baseline-account-circle" text="Account" :showIf="!!user" />
      <NavbarLink to="/drive" icon="ic:round-drive-eta" text="Drive" :showIf="!!user" />
      <NavbarLogoutButton :showIf="user" />
      <ThemeToggler />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<style scoped>
.nav-item {
  list-style-type: none;
}
</style>