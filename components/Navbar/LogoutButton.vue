<template>
  <li v-if="user" class="nav-item">
    <NuxtLink to="/logout" class="btn btn-outline md:btn-ghost">
      <Icon title="Log Out" name="fa-solid:sign-out-alt" />
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>

