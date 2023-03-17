<template>
  <nav class="bg-base-200 p-4 sticky top-0 z-10">
    <ul class="flex justify-around">
      <li class="nav-item">
        <HomeButton />
      </li>
      <li class="nav-item">
        <nuxt-link to="/#how-it-works" class="btn btn-ghost">How It Works</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/#fees" class="btn btn-ghost">Fees</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/#contact" class="btn btn-ghost">Contact Us</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/request-trip" class="btn btn-ghost">Request a Trip</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/driver-login" class="btn btn-ghost">Driver Login</nuxt-link>
      </li>
      <li class="nav-item">
        <ThemeToggler />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-item {
  list-style-type: none;
}
</style>