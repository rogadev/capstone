<template>
  <div class="container m-4">
    <div class="flex flex-col justify-center items-center">
      <div class="prose mb-4">
        <h2>Account</h2>
      </div>
      <ButtonLink to="/account/edit" class="btn btn-primary btn-wide">
        Edit Account
      </ButtonLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'driver',
  middleware: 'auth'
});
useHead({
  title: 'Account',
});
</script>