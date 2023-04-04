import { fetchAllStops } from '../../server/db/supabase';
<template>
  <div>
    <div>
      <div class="text-center py-4 text-xl font-semibold block md:hidden">
        {{ dateString }}
      </div>
      <div class="flex flex-row justify-evenly items-center my-4">
        <button class="btn btn-outline w-[150px]" @click="dateBack">Back</button>
        <div class="hidden md:block py-4 text-xl font-semibold">{{ dateString }}</div>
        <button class="btn btn-outline w-[150px]" @click="dateForward">Forward</button>
      </div>
      <DriveStopList :date="dateString" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'driver',
  middleware: 'auth'
});
useHead({
  title: 'Drive',
});
const date: Ref<Date> = ref(new Date());
const dateString = computed(() =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(date.value).replace(/\//g, '-')
);
/**
 * Change the date either forward or backward by one day.
 * @param numberOfDays Number of days to change the date by. Defaults to 1 to increment forward by one day.
 */
function changeDate(delta: number = 1) {
  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() + delta);
  date.value = newDate;
}

function dateForward() {
  changeDate(1);
}

function dateBack() {
  changeDate(-1);
}
</script>