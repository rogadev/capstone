<template>
  <div id="page-container" class="p-4">

    <header class="prose">
      <h1>Enter Your Trip List</h1>
    </header>

    <div id="form-container" class="mr-4">
      <form @submit="handleSubmit">
        <textarea name="input" id="input" rows="20" class="w-full my-6 rounded dark:text-black"></textarea>
        <div class="flex flex-col mb-6">
          <button type="submit" class="btn btn-primary w-1/3 min-w-[250px] mx-auto"
            :class="{ 'disabled': generatingTrips }">Generate {{ generatedOnce ? "Again" :
              "Trips"
            }}
          </button>
        </div>
      </form>
    </div>

    <div id="staging-area" class="mt-6">
      <div id="staging-area-header" class="flex justify-between">
        <h2 class="text-xl">Staging Area</h2>
      </div>
      <div id="staging-area-content">
        <div class="staging-area-item">
          <div class="staging-area-item-header">
            <h3 class="text-lg">Trip 1</h3>
            <button class="btn btn-primary">Edit</button>
          </div>
          <div class="staging-area-item-content">
            <p>Content</p>
          </div>
        </div>
        <div class="staging-area-item">
          <div class="staging-area-item-header">
            <h3 class="text-lg">Trip 2</h3>
            <button class="btn btn-primary">Edit</button>
          </div>
          <div class="staging-area-item-content">
            <p>Content</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const generatedOnce = ref(false);
const generatingTrips = ref(false);
const stagingArea = ref([]);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  console.log('Handling Form Submit');
  // Send the form data to GPT
  // GPT generates and returns our trip data
  // populate our staging area with the trip data
};
</script>