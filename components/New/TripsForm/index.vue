<template>
  <div class="container">
    <form @submit.prevent="(e) => handleSubmit(e)" class="container">
      <div class="input-group-lg">
        <label for="prompt" class="text-3xl font-bold">Trip List</label>
        <p>Copy and paste your list of trips from email into the text area below.</p>
        <div class="flex flex-row gap-16 items-baseline mb-4">
          <label for="date">Trip Date <small>(tomorrow by default):</small></label>
          <input v-model="date" type="date" name="date" id="date" class="input" :disabled="generated || generating"
            :class="generated || generating ? 'disabled input-disabled' : 'input-sm input-accent'">
        </div>
        <textarea autocomplete="off" v-model="prompt" name="prompt" id="prompt" class="w-full textarea"
          :class="generated || generating ? 'textarea-disabled text-gray-500' : 'text-white input-accent'"
          rows="10"></textarea>
      </div>
      <div class="flex flex-row-reverse">
        <button type="submit" class="btn"
          :class="[generating ? 'loading btn-disabled' : 'btn-primary', generated || prompt === '' ? 'btn-disabled' : '',]">
          {{ generated ? 'Success! - Trips Generated' : 'Generate Trips' }}
        </button>
      </div>
    </form>
    <div class="font-semibold text-red-600 dark:text-red-500" v-if="errorMessage !== ''">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const date = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
const generated = ref(false);
const generating = ref(false);
const errorMessage = ref('');
const prompt = ref('');

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const { generateTrips } = useTripsStore();
  errorMessage.value = '';
  generating.value = true;
  const { error } = await generateTrips(prompt.value, date.value);
  if (error) {
    errorMessage.value = error;
  } else {
    generated.value = true;
  }
  generating.value = false;
};
</script>