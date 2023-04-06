<template>
  <div class="w-full m-4">
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
          :class="generated || generating ? 'textarea-disabled text-gray-500' : 'input-accent'" rows="10"></textarea>
      </div>
      <div class="flex flex-row-reverse items-center gap-8">
        <button type="submit" class="btn"
          :class="[generating ? 'loading btn-disabled' : 'btn-primary', generated || prompt === '' ? 'btn-disabled' : '',]">
          {{ prompt === '' ?
            'Enter Trips To Generate' :
            generated ?
              'Success! - Trips Generated' :
              'Generate Trips' }}
        </button>
        <p v-if="generating" class="text-sm text-gray-500 dark:text-gray-400">
          Estimated generation time: {{ countdown }} seconds
        </p>
      </div>
    </form>
    <div class="font-semibold text-red-600 dark:text-red-500" v-if="errorMessage !== ''">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['generated']);

const date = ref(getTomorrowDateString());
const generated = ref(false);
const generating = ref(false);
const errorMessage = ref('');
const prompt = ref('');

// TODO Start saving durations in the database
const estimatedGenerationDuration = computed(() => {
  const count = (prompt.value.match(/:/g) || []).length;
  return count * 6;
});

function getTomorrowDateString(): string {
  const today: Date = new Date();
  const tomorrow: Date = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year: number = tomorrow.getFullYear();
  const month: number = tomorrow.getMonth() + 1; // Months are 0-based, so we add 1
  const day: number = tomorrow.getDate();

  const yearString: string = year.toString();
  const monthString: string = month < 10 ? `0${month}` : month.toString();
  const dayString: string = day < 10 ? `0${day}` : day.toString();

  return `${yearString}-${monthString}-${dayString}`;
}

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const { generateTripsToValidate } = useTripStore();
  errorMessage.value = '';
  generating.value = true;
  const { error } = await generateTripsToValidate(prompt.value, date.value);
  if (error) {
    errorMessage.value = error;
  } else {
    generated.value = true;
    emits('generated');
  }
  generating.value = false;
};

// while generating, create a setInterval and count down the estimatedGenerationDuration to zero.
let interval: NodeJS.Timeout;
const countdown = ref(0);
watch(generating, (generating) => {
  countdown.value = estimatedGenerationDuration.value;
  if (generating) {
    interval = setInterval(() => {
      countdown.value -= 1;
      if (estimatedGenerationDuration.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  } else {
    clearInterval(interval);
  }
});
</script>