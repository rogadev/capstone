<template>
  <div id="page-container" class="p-4">

    <!-- Cancel Dialog -->
    <div v-if="dialogOpen" class="cursor-pointer w-screen h-screen fixed top-0 left-0 z-20 bg-black bg-opacity-50"
      @click="closeDialog">
      <dialog :open="dialogOpen" id="confirm-cancel"
        class="cursor-auto relative top-36 z-30 dialog prose text-center rounded shadow-xl border border-gray-800 p-4"
        @close="navigateBack">
        <div class="dialog-content">
          <h2>Are you sure you want to cancel?</h2>
          <p class="text-center">All your progress will be lost.</p>
          <div class="flex flex-row gap-4">
            <button type="button" class="btn btn-error btn-wide hover:font-bold hover:text-base" @click="navigateBack">
              Yes, I want to cancel
            </button>
            <button type="button" class="btn btn-success btn-wide hover:font-bold hover:text-base" @click="closeDialog">
              No, continue editing
            </button>
          </div>
        </div>
      </dialog>
    </div>

    <!-- Page Header -->
    <header class="my-4 flex flex-col justify-center items-center">
      <div class="prose text-center">
        <h1>Enter Your Trip Details</h1>
        <div class="pb-4">
          <button type="button" class="btn btn-error btn-wide" @click="handleCancel">
            Cancel
          </button>
        </div>
      </div>
    </header>

    <!-- Input Details -->
    <form @submit="handleSubmit" class="mx-auto w-5/6 py-4">
      <!-- Stage Information -->
      <div class="prose mx-auto mb-4">
        <h2 class="text-center">Step {{ currentStage }}: {{ STAGES[currentStage - 1] }}</h2>
      </div>

      <!-- Trip Arrival Time -->
      <div v-show="currentStage === 1" class="form-control">
        <label class="label">
          <span class="label-text">Arrival Time</span>
        </label>
        <label for="arrival_time" class="input-group">
          <span>24H Format</span>
          <input @focusout="handleFormatArrivalTime" name="arrival_time" v-model="arrivalTime" type="text"
            placeholder="00:00 - 23:45" class="input input-bordered" />
        </label>
      </div>

      <!-- Passenger Details -->
      <div v-show="currentStage === 2">
        <!--  -->
      </div>

      <!-- Pickup Location -->
      <div v-show="currentStage === 3">
      </div>

      <!-- Drop Off Location -->
      <div v-show="currentStage === 4">
        <!--  -->
      </div>

      <!-- Appointment Details -->
      <div v-show="currentStage === 5">
        <!--  -->
      </div>

      <!-- Accessibility -->
      <div v-show="currentStage === 6">
        <!--  -->
      </div>

      <!-- Payment -->
      <div v-show="currentStage === 7">
        <!--  -->
      </div>

      <!-- Other Details -->
      <div v-show="currentStage === 8">
        <!--  -->
      </div>

      <!-- Review -->
      <div v-show="currentStage === 9" class="prose">
        <!--  -->
      </div>

      <div id="control" class="flex flex-row justify-between mx-6 items-center">
        <button type="button" class="btn btn-warning btn-wide" :class="{ 'btn-disabled': currentStage === 1 }"
          @click="stepBackward">
          Back
        </button>
        <button type="button" class="btn btn-success btn-wide" @click="stepForward">
          {{ currentStage === STAGES.length ? 'Submit' : 'Next' }}
        </button>
      </div>
    </form>

  </div>
</template>

<script lang="ts" setup>
const STAGES = [
  "Trip Arrival Time",
  "Passenger Details",
  "Pick Up Location",
  "Drop Off Location",
  "Appointment Details",
  "Accessibility",
  "Payment",
  "Other Details",
  "Review",
];

const arrivalTime = ref('');
const arrivalTimeError = ref('');

const dialogOpen = ref(false);
const currentStage = ref(1);

const handleFormatArrivalTime = () => {
  if (arrivalTime.value.toLowerCase().includes('am') || arrivalTime.value.toLowerCase().includes('pm')) {
    const pm = arrivalTime.value.toLowerCase().includes('pm');
    let [h, m] = arrivalTime.value.split(':');
    if (!h || !m) return (arrivalTimeError.value = 'Invalid Time. Please enter a valid 24-hour time. (e.g. 14:00)');
    let hours = parseInt(h);
    const minutes = parseInt(m);
    if (pm) hours = hours + 12;
    if (hours < 0 || hours > 24 || minutes < 0 || minutes > 59) {
      arrivalTimeError.value = 'Invalid Time';
    } else {
      arrivalTimeError.value = '';
    }
    const roundedMinutes = Math.round(minutes / 15) * 15;
    const hh = hours < 10 ? `0${hours}` : hours;
    const mm = roundedMinutes > 10 ? `${roundedMinutes}` : '00';
    arrivalTime.value = `${hh}:${mm}`;
  }
  if (!arrivalTime.value.includes(':')) {
    arrivalTime.value = arrivalTime.value.replace(/(\d{2})(\d{2})/, '$1:$2');
  }
  let [h, m] = arrivalTime.value.split(':');
  if (!h || !m) return (arrivalTimeError.value = 'Invalid Time. Please enter a valid 24-hour time. (e.g. 14:00)');
  const hours = parseInt(h);
  const minutes = parseInt(m);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    arrivalTimeError.value = 'Invalid Time';
  } else {
    arrivalTimeError.value = '';
  }
  const roundedMinutes = Math.round(minutes / 15) * 15;
  const hh = hours < 10 ? `0${hours}` : hours;
  const mm = roundedMinutes < 10 ? `0${roundedMinutes}` : roundedMinutes;
  arrivalTime.value = `${hh}:${mm}`;
};

const handleSubmit = () => {
  console.log('Handling Form Submit');
};

const handleCancel = () => {
  dialogOpen.value = true;
};

const navigateBack = () => {
  window.history.back();
};

const closeDialog = () => {
  dialogOpen.value = false;
};

const stepForward = () => {
  if (currentStage.value < STAGES.length) currentStage.value++;
  else handleSubmit();
};

const stepBackward = () => {
  if (currentStage.value > 1) currentStage.value--;
};
</script>