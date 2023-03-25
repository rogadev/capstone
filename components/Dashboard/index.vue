<template>
  <div class="container mx-auto">
    <header class="mx-4 md:mx-0">
      <h1 class="text-4xl font-bold">
        Dashboard
      </h1>
      <h3 class="text-2xl font-semibold">
        Welcome to your dashboard
      </h3>
    </header>
    <div class="mx-4 md:mx-0 mt-6">
      <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:justify-between">
        <ButtonLink to="/trips/new" classes="btn-primary btn-wide">
          <span class="flex items-center gap-4">
            <Icon name="material-symbols:add-circle-outline-rounded" classes="w-5 h-5 mr-2" />
            Add Trips
          </span>
        </ButtonLink>
        <ButtonLink to="/trips" classes="btn-primary btn-wide">
          <span class="flex items-center gap-4">
            <Icon name="bx:trip" classes="w-5 h-5 mr-2" />
            Trips
          </span>
        </ButtonLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>