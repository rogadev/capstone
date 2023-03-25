<template>
  <div class="container px-4 md:px-0">
    <form @submit="handleSubmit" class="container">
      <div class="input-group-lg">
        <label for="prompt" class="text-3xl font-bold">Trip List</label>
        <p>Copy and paste your list of trips from email into the text area below.</p>
        <textarea name="prompt" id="prompt" class="w-full" rows="10"></textarea>
      </div>
      <div class="flex flex-row-reverse">
        <button type="submit" class="btn" :class="generating ? 'loading btn-disabled' : 'btn-primary'">Generate
          Trips</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const generating = ref(false);

const handleSubmit = (e: any) => {
  e.preventDefault();
  generating.value = true;
  console.log('submit');
  //
  generating.value = false;
};
</script>