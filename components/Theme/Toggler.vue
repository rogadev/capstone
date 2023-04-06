import { useTheme } from '../../composables/useTheme';
<template>
  <li class="nav-item">
    <button class="btn btn-outline md:btn-ghost" @click="() => toggleTheme()">
      <Icon v-if="darkMode" name="fa-solid:sun" />
      <Icon v-else name="fa-solid:moon" />
    </button>
  </li>
</template>

<script lang="ts" setup>
const { toggleTheme } = useTheme();
const { darkMode } = useThemeStore();
</script>