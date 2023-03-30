import { useTheme } from '../../composables/useTheme';
<template>
  <li class="nav-item">
    <button class="btn btn-outline md:btn-ghost" @click="() => toggleTheme()">
      <Icon v-if="darkMode" name="ic:baseline-light-mode" />
      <Icon v-else name="ic:baseline-dark-mode" />
    </button>
  </li>
</template>

<script lang="ts" setup>
const { toggleTheme } = useTheme();
const { darkMode } = useThemeStore();
</script>