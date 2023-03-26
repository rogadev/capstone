<template>
  <div class="container">
    <form @submit.prevent="(e) => handleSubmit(e)" class="container">
      <div class="input-group-lg">
        <label for="prompt" class="text-3xl font-bold">Trip List</label>
        <p>Copy and paste your list of trips from email into the text area below.</p>
        <textarea autocomplete="off" v-model="prompt" name="prompt" id="prompt" class="w-full textarea"
          :class="generated || generating ? 'textarea-disabled text-gray-500' : 'text-white'" rows="10"></textarea>
      </div>
      <div class="flex flex-row-reverse">
        <button type="submit" class="btn"
          :class="[generating ? 'loading btn-disabled' : 'btn-primary', generated || prompt === '' ? 'btn-disabled' : '',]">
          {{ generated ? 'Success! - Trips Generated' : 'Generate Trips' }}
        </button>
      </div>
    </form>
    <div class="font-semibold text-red-600 dark:text-red-500" v-if="error !== ''">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  handleSubmit: {
    type: Function as PropType<(e: Event) => void>,
    required: true,
  },
  generated: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  generating: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  error: {
    type: String as PropType<string>,
    required: true,
  },
});
const prompt = ref('');
</script>