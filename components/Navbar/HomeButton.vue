<template>
  <li class="nav-item">
    <nuxt-link :to="user ? '/dashboard' : '/'">
      <button class="btn btn-outline md:btn-ghost">
        <Icon title="Home" name="fa-solid:home" />
      </button>
    </nuxt-link>
  </li>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>