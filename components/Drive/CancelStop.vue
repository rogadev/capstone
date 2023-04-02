<template>
  <div class="mt-6">
    <h3 class="text-2xl font-bold text-center">Cancel Trip</h3>
    <div class="flex flex-row justify-center items-center gap-4 my-4">
      <label for="cancellationReason" class="label font-semibold">Cancellation Reason:</label>
      <select id="cancellationReason" :class="{ 'disabled select-disabled': loading }" class="select select-warning"
        v-model="cancellationReason" :disabled="loading">
        <option v-for="reason in REASONS" :value="reason">{{ reason }}</option>
      </select>
    </div>
    <div class="flex flex-row justify-between mt-8 mb-3">
      <button :class="{ 'btn-disabled loading': loading }" class="btn btn-error btn-wide mx-auto" @click="cancel"
        :disabled="loading">Wait, Go
        Back</button>
      <button :class="{ 'btn-disabled loading': loading }" class="btn btn-success btn-wide mx-auto" @click="confirm"
        :disabled="loading">Yes,
        Cancel</button>
    </div>
    <div class="flex flex-col w-full">
      <label for="cancellationNotes" class="text-center">Cancellation Notes</label>
      <textarea id="cancellationNotes" v-model="cancellationNote" class="textarea textarea-warning w-full"
        :class="{ 'textarea-disabled': loading }" :disabled="loading" rows="3"></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
const REASONS = ['no-show', 'passenger cancelled on arrival', 'driver cancelled trip', 'wrong address', 'wrong time', 'other'];

const cancellationReason: Ref<string> = ref(REASONS[0]);
const cancellationNote: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);

const emits = defineEmits(['cancel', 'deleted']);

const props = defineProps({
  stopID: {
    type: Number,
    required: true,
  }
});

const cancel = () => {
  emits('cancel');
};

const confirm = async () => {
  loading.value = true;
  const response = await fetch(`/api/stops/cancel/${props.stopID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reason: cancellationReason.value,
      note: cancellationNote.value,
    })
  });
  if (response.ok) emits('deleted');
  else console.error('error cancelling trip');
  loading.value = false;
}

</script>